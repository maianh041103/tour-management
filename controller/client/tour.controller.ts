import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";

export const index = async (req: Request, res: Response) => {
  const slugCategory = req.params.slugCategory;
  console.log(slugCategory);
  const tours = await sequelize.query(`
  select tours.*, price*(1-discount/100) as price_special
  from tours
  join tours_categories on tours.id = tours_categories.tour_id
  join categories on categories.id = tours_categories.category_id
  where 
    tours.deleted = false 
    and tours.status = 'active'
    and categories.slug = '${slugCategory}'
    and categories.status = 'active'
  `, { type: QueryTypes.SELECT })

  tours.forEach(item => {
    if (item["images"]) {
      item["images"] = JSON.parse(item["images"]);
      item["image"] = item["images"][0];
    }
    else
      item["image"] = "";
    item["price_special"] = parseInt(item["price_special"]);
  })

  console.log(tours);

  res.render('client/pages/tours/index', {
    title: "Danh sách tour",
    tours: tours
  });
}

export const detail = async (req: Request, res: Response) => {
  const slugTour = req.params.slugTour;
  const tourDetail = await Tour.findOne({
    where: {
      deleted: false,
      status: "active",
      slug: slugTour
    },
    raw: true
  });
  tourDetail["images"] = JSON.parse(tourDetail["images"]);
  tourDetail["price_special"] = tourDetail["price"] * (1 - tourDetail["discount"] / 100);

  res.render("client/pages/tours/detail.pug", {
    pageTitle: "Chi tiết Tour",
    tourDetail: tourDetail
  })
}