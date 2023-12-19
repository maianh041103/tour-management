import { Request, Response } from "express";
import Tour from "../../models/tour.model";

export const index = async (req: Request, res: Response) => {
  const tours = await Tour.findAll({
    where: {
      deleted: false,
      status: "active"
    },
    raw: true
  });

  res.render('client/tours/index', {
    title: "Danh sách tour",
    tours: tours
  });
}