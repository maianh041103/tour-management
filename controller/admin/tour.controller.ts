import { Request, Response } from "express"
import Tour from "../../models/tour.model"
import Category from "../../models/category.model";
import { generateTourCode } from "../../helper/generate.helper";
import TourCategory from "../../models/tours-categories";
import { systemConfig } from "../../config/system";

//[GET] /admin/tours
export const index = async (req: Request, res: Response) => {
  const tours = await Tour.findAll({
    where: {
      deleted: false
    },
    raw: true
  })
  for (const tour of tours) {
    tour["price_special"] = tour["price"] * (1 - tour["discount"] / 100);
    if (tour["images"]) {
      tour["image"] = JSON.parse(tour["images"])[0];
    } else {
      tour["image"] = "";
    }
  }
  res.render("admin/pages/tours/index.pug", {
    pageTitle: "Danh sách tour",
    tours: tours
  })
}

//[GET] /admin/tours/create
export const create = async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    where: {
      deleted: false
    },
    raw: true
  })
  res.render("admin/pages/tours/create.pug", {
    pageTitle: "Thêm tour",
    categories: categories
  })
}

//[POST] /admin/tours/create
export const createPOST = async (req: Request, res: Response) => {
  const tour = req.body;
  if (tour["position"]) {
    tour["position"] = parseInt(tour["position"]);
  } else {
    const count = await Tour.count({
      where: {
        deleted: false
      }
    })
    tour["position"] = count + 1;
  }

  const code = generateTourCode(tour["position"]);
  const dataTour = {
    title: tour.title,
    code: code,
    price: parseInt(tour["price"]),
    discount: parseInt(tour["discount"]),
    stock: parseInt(tour["stock"]),
    information: tour["information"],
    schedule: tour["schedule"],
    timeStart: tour.timeStart,
    position: tour["position"],
    status: tour.status,
    images: JSON.stringify(tour["images"])
  }

  const newTour = await Tour.create(dataTour);

  //Thêm vào tours-categories
  await TourCategory.create({
    tour_id: newTour["id"],
    category_id: req.body.category_id
  });

  res.redirect(`${systemConfig.prefixAdmin}/tours`);
}

//[PATCH] /admin/tours/change-status
export const changeStatus = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    const status = req.query.status;
    const statusChange = (status == "active") ? "inactive" : "active";
    await Tour.update({
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

//[GET] /admin/tours/detail/:id
export const detail = async (req: Request, res: Response) => {
  let tour = await Tour.findOne({
    where: {
      id: req.params.id
    },
    raw: true
  });
  tour["images"] = JSON.parse(tour["images"]);
  res.render("admin/pages/tours/detail.pug", {
    pageTitle: "Chi tiết tour",
    tour: tour
  })
}

//[GET] /admin/tours/edit/:id
export const edit = async (req: Request, res: Response) => {
  const tour = await Tour.findOne({
    where: {
      id: req.params.id,
      deleted: false
    },
    raw: true
  });
  const tourCategory = await TourCategory.findOne({
    where: {
      tour_id: req.params.id
    }
  })
  const categories = await Category.findAll({
    where: {
      deleted: false
    }
  })
  res.render("admin/pages/tours/edit.pug", {
    pageTitle: "Sửa tour",
    tour: tour,
    tourCategory: tourCategory,
    categories: categories
  })
}

//[PATCH] /admin/tours/edit/:id
export const editPATCH = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const tourOld = await Tour.findOne({
      where: {
        id: req.params.id
      },
      raw: true
    });
    if (!data.images) {
      data.images = tourOld["images"];
    }
    if (!data.timeStart) {
      data.timeStart = tourOld["timeStart"];
    }
    await Tour.update(data, {
      where: {
        id: req.params.id
      }
    });
    req["flash"]("success", "Sửa thông tin tour thành công");
    res.redirect("back");
  } catch (error) {
    req["flash"]("error", "Sửa thông tin tour thất bại");
    res.redirect("back");
  }
}

//[DELETE] /admin/tours/delete/:id
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Tour.update({
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