import { Request, Response } from "express";
import Tour from "../../models/tour.model";

//[GET] /cart
export const index = async (req: Request, res: Response) => {
  res.render('client/pages/cart/index.pug', {
    pageTitle: "Trang giỏ hàng"
  })
}


//[POST] /cart/list-json
export const listJSON = async (req: Request, res: Response) => {
  const tours = req.body;
  let dataReturn = [];
  for (let item of tours) {
    const tour = await Tour.findOne({
      where: {
        id: item.tourId,
        deleted: false,
        status: "active"
      },
      raw: true
    });
    tour["price_special"] = tour["price"] * (1 - tour["discount"] / 100);
    tour["images"] = JSON.parse(tour["images"]);
    tour["total"] = tour["price_special"] * item.quantity;
    tour["quantity"] = item.quantity;
    dataReturn.push(tour);
  }

  res.json({
    data: dataReturn
  })
}