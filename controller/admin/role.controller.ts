import { Request, Response } from "express";

import Role from "../../models/role.model";
import { systemConfig } from "../../config/system";

//[GET] /admin/roles/
export const index = async (req: Request, res: Response) => {
  const roles = await Role.findAll({
    where: {
      deleted: false
    }
  })
  res.render("admin/pages/roles/index.pug", {
    pageTitle: "Nhóm quyền",
    roles: roles
  });
}

//[GET] /admin/roles/create
export const create = async (req: Request, res: Response) => {
  res.render("admin/pages/roles/create.pug", {
    pageTitle: "Tạo mới nhóm quyền"
  })
}

//[POST] /admin/roles/createPOST
export const createPOST = async (req: Request, res: Response) => {
  try {
    await Role.create(req.body);
    req["flash"]("success", "Thêm mới nhóm quyền thành công");
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  } catch (error) {
    req["flash"]("error", "Thêm mới nhóm quyền thất bại");
  }
}

//[GET] /admin/roles/detail/:id
export const detail = async (req: Request, res: Response) => {
  try {
    const role = await Role.findOne({
      where: {
        id: req.params.id
      }
    });
    res.render("admin/pages/roles/detail.pug", {
      pageTitle: "Chi tiết nhóm quyền",
      role: role
    });
  } catch (error) {
    res.redirect("back");
    req["flash"]("error", "Không tìm thấy nhóm quyền");
  }
}

//[GET] /admin/roles/edit/:id
export const edit = async (req: Request, res: Response) => {
  try {
    const role = await Role.findOne({
      where: {
        deleted: false,
        id: req.params.id
      }
    });
    res.render("admin/pages/roles/edit.pug", {
      pageTitle: "Chỉnh sửa nhóm quyền",
      role: role
    })
  } catch (error) {
    req["flash"]("error", "Không tìm thấy nhóm quyền");
    res.redirect("back");
  }
}

//[PATCH] /admin/roles/edit/:id
export const editPATCH = async (req: Request, res: Response) => {
  try {
    await Role.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    req["flash"]("success", "Cập nhật nhóm quyền thành công");
    res.redirect("back");
  } catch (error) {
    req["flash"]("error", "Cập nhật nhóm quyền thất bại");
    res.redirect("back");
  }

}

//[DELETE] /admin/roles/delete/:id
export const deleteItem = async (req: Request, res: Response) => {
  try {
    await Role.update({
      deleted: true,
      deletedAt: new Date()
    }, {
      where: {
        id: req.params.id
      }
    });
    res.json({
      code: 200,
      message: "Xóa tour thành công"
    })
  } catch (error) {
    res.json({
      code: 400,
      message: "Xóa tour thất bại"
    })
  }
}

//[GET] /admin/roles/permissions
export const permission = async (req: Request, res: Response) => {
  const roles = await Role.findAll({
    where: {
      deleted: false
    }
  });
  res.render("admin/pages/roles/permission.pug", {
    pageTitle: "Phân quyền",
    roles: roles
  })
}

//[PATCH] /admin/roles/permissions
export const permissionPATCH = async (req: Request, res: Response) => {
  try {
    const listPermission = req.body;
    listPermission.forEach(async (item) => {
      await Role.update({
        permissions: JSON.stringify(item.permissions)
      }, {
        where: {
          id: parseInt(item.id)
        }
      })
    });
    const roles = await Role.findAll({
      where: {
        deleted: false
      },
      raw: true
    })
    res.json({
      code: 200,
      roles: roles
    })
  } catch (error) {
    console.log(error);
    res.json({
      code: 400
    })
  }
}