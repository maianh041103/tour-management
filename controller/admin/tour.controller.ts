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