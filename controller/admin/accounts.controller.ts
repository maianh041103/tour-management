import { Request, Response } from "express"
import Account from "../../models/account.model"
import Role from "../../models/role.model";
import md5 from "md5";

//[GET] /admin/accounts
export const index = async (req: Request, res: Response) => {
  const accounts = await Account.findAll({
    where: {
      deleted: false
    },
    raw: true
  });
  for (let account of accounts) {
    const role = await Role.findOne({
      where: {
        deleted: false,
        id: account["role_id"]
      },
      raw: true
    });
    account["role"] = role;
  }
  res.render("admin/pages/list-accounts/index.pug", {
    pageTitle: "Danh sách tài khoản",
    accounts: accounts
  })
}

//[GET] /admin/accounts/detail/:id
export const detail = async (req: Request, res: Response) => {
  const account = await Account.findOne({
    where: {
      id: req.params.id,
      deleted: false
    },
    raw: true
  });
  const role = await Role.findOne({
    where: {
      deleted: false,
      id: account["role_id"]
    },
    raw: true
  });
  account["role"] = role;

  res.render("admin/pages/list-accounts/detail.pug", {
    pageTitle: "Chi tiết tài khoản",
    account: account
  })
}

//[GET] /admin/accounts/edit/:id
export const edit = async (req: Request, res: Response) => {
  const user = await Account.findOne({
    where: {
      id: req.params.id,
      deleted: false
    },
    raw: true
  });
  const roles = await Role.findAll({
    where: {
      deleted: false
    },
    raw: true
  });

  res.render("admin/pages/list-accounts/edit.pug", {
    pageTitle: "Chỉnh sửa tài khoản",
    user: user,
    roles: roles
  })
}

//[PATCH] /admin/accounts/edit/:id
export const editPATCH = async (req: Request, res: Response) => {
  try {
    console.log(req.body.password);
    if (req.body.password !== "") {
      req.body.password = md5(req.body.password);
    }
    else {
      delete req.body.password;
    }
    await Account.update(req.body, {
      where: {
        id: req.params.id,
        deleted: false
      }
    });
    req["flash"]("success", "Cập nhật thông tin tài khoản thành công");
    res.redirect("back");
  } catch (error) {
    req["flash"]("error", "Cập nhật thông tin tài khoản thất bại");
    res.redirect("back");
  }
}

//[DELETE] /admin/accounts/delete/:id
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Account.update({
      deleted: true,
      deletedAt: new Date()
    }, {
      where: {
        id: req.params.id
      }
    });
    res.json({
      code: 200,
      message: "Xóa tài khoản thành công"
    })
  } catch (error) {
    res.json({
      code: 400,
      message: "Xóa tài khoản thất bại"
    })
  }
}