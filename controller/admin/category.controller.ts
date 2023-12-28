import { Request, Response } from "express";
import Category from "../../models/category.model";
import { systemConfig } from "../../config/system";

//[GET] /admin/categories
export const index = async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    where: {
      deleted: false
    },
    raw: true
  });
  res.render("admin/pages/categories/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    categories: categories
  })
}

//[GET] /admin/categories/create
export const create = async (req: Request, res: Response) => {
  res.render("admin/pages/categories/create.pug", {
    pageTitle: "Thêm mới danh mục"
  })
}

//[POST] /admin/categories/create
export const createPOST = async (req: Request, res: Response) => {
  const data = req.body;
  if (data.position) {
    data.position = parseInt(data.position);
  } else {
    const count = await Category.count({
      where: {
        deleted: false
      }
    })
    data.position = count + 1;
  }

  let category = {
    title: data.title,
    image: data.image,
    description: data.description,
    status: data.status,
    position: data.position
  }

  await Category.create(category);

  res.redirect(`${systemConfig.prefixAdmin}/categories`);
}

//[GET] /admin/categories/detail/:id
export const detail = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  const category = await Category.findOne({
    where: {
      id: categoryId,
      deleted: false
    },
    raw: true
  });
  res.render("admin/pages/categories/detail.pug", {
    pageTitle: "Chi tiết danh mục",
    category: category
  })
}

//[GET] /admin/categories/edit/:id
export const edit = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  const category = await Category.findOne({
    where: {
      id: categoryId,
      deleted: false
    },
    raw: true
  });
  res.render("admin/pages/categories/edit.pug", {
    pageTitle: "Chỉnh sửa danh mục",
    category: category
  })
}

//[PATCH] /admin/categories/edit/:id
export const editPATCH = async (req: Request, res: Response) => {
  await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  res.redirect("back");
}

//[DELETE] /admin/categories/delete/:id
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Category.update({
      deleted: true,
      deletedAt: new Date()
    }, {
      where: {
        id: req.params.id
      }
    });
    res.json({
      code: 200,
      message: "Xóa danh mục thành công"
    })
  } catch (error) {
    res.json({
      code: 400,
      message: "Xóa danh mục thất bại"
    })
  }
}

//[PATCH] /admin/categories/change-status?id&status
export const changeStatus = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    const status = req.query.status;
    const statusChange = (status == "active") ? "inactive" : "active";
    await Category.update({
      status: statusChange
    }, {
      where: {
        id: id
      }
    });
    req["flash"]("success", "Đổi trạng thái thành công");
    res.json({
      code: 200,
      message: "Đổi trạng thái thành công"
    })
  } catch (error) {
    req["flash"]("error", "Đổi trạng thái thất bại");
    res.json({
      code: 400,
      message: "Đổi trạng thái thất bại"
    })
  }
}