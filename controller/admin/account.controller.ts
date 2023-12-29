import { Request, Response } from "express";
import Account from "../../models/account.model";
import { systemConfig } from "../../config/system";
import md5 from "md5";
import { generateToken } from "../../helper/generate.helper";
import Role from "../../models/role.model";

//[GET] /admin/accounts/register
export const register = async (req: Request, res: Response) => {
  res.render("admin/pages/accounts/register.pug", {
    pageTitle: "Đăng ký tài khoản"
  })
}

//[POST] /admin/accounts/register
export const regiterPOST = async (req: Request, res: Response) => {
  const email = req.body.email;
  const emailExists = await Account.findOne({
    where: {
      email: email,
      deleted: false
    }
  })
  if (!emailExists) {
    req.body["password"] = md5(req.body["password"]);
    req.body["token"] = generateToken(20);
    await Account.create(req.body);
    res.redirect(`${systemConfig.prefixAdmin}/accounts/login`);
  } else {
    req["flash"]("error", "Email đã tồn tại");
    res.redirect("back");
  }
}

//[GET] /admin/accounts/login
export const login = async (req: Request, res: Response) => {
  res.render('admin/pages/accounts/login.pug', {
    pageTitle: "Đăng nhập"
  })
}

//[POST] /admin/accounts/loginPOST
export const loginPOST = async (req: Request, res: Response) => {
  const emailExist = await Account.findOne({
    where: {
      email: req.body.email,
      deleted: false
    },
    raw: true
  });
  if (!emailExist) {
    req["flash"]("error", "Email không tồn tại");
    res.redirect("back");
  } else {
    if (emailExist["password"] === md5(req.body.password)) {
      res["cookie"]("token", emailExist["token"]);
      res.redirect(`${systemConfig.prefixAdmin}/categories`);
    } else {
      req["flash"]("error", "Mật khẩu không chính xác");
      res.redirect("back");
    }
  }
}

//[GET] /admin/accounts/logout
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/accounts/login`);
}

//[GET] /admin/accounts/info
export const info = async (req: Request, res: Response) => {
  res.render("admin/pages/accounts/info.pug", {
    pageTitle: "Thông tin tài khoản"
  })
}

//[GET] /admin/accounts/edit
export const edit = async (req: Request, res: Response) => {
  res.render("admin/pages/accounts/edit.pug", {
    pageTitle: "Sửa thông tin cá nhân"
  })
}

//[PATCH] /admin/accounts/editPATCH
export const editPATCH = async (req: Request, res: Response) => {
  try {
    await Account.update(req.body, {
      where: {
        deleted: false,
        id: res.locals.account.id
      }
    });
    req["flash"]("success", "Đổi thông tin thành công");
    res.redirect("back");
  } catch (error) {
    console.log(error);
    req["flash"]("error", "Đổi thông tin thất bại");
    res.redirect("back");
  }
}

//[GET] /admin/accounts/change-password
export const changePassword = async (req: Request, res: Response) => {
  res.render("admin/pages/accounts/change-password", {
    pageTitle: "Đổi mật khẩu"
  });
}

//[PATCH] /admin/accounts/change-password
export const changePasswordPATCH = async (req: Request, res: Response) => {
  try {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    if (md5(oldPassword) == res.locals.account.password) {
      await Account.update({
        password: md5(newPassword)
      }, {
        where: {
          id: res.locals.account.id
        }
      })
      req["flash"]("success", "Đổi mật khấu thành công");
    } else {
      req["flash"]("error", "Mật khẩu cũ không chính xác");
    }
    res.redirect("back");
  } catch (error) {
    console.log(error);
    req["flash"]("error", "Đổi mật khẩu thất bại");
    res.redirect("back");
  }
}