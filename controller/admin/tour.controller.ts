import { Request, Response } from "express"
import Tour from "../../models/tour.model"

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