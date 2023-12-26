import { Request, Response } from "express"
import Order from "../../models/order.model";
import { generateCodeOrder } from "../../helper/generate.helper";
import Tour from "../../models/tour.model";
import OrderItem from "../../models/orders-item.model";

//[POST] /order
export const order = async (req: Request, res: Response) => {
  const data = req.body;

  //Lưu vào bảng order
  let order = {
    code: "",
    fullName: data.info.fullName,
    phone: data.info.phone,
    note: data.info.note,
    status: "initial"
  }

  const newOrder = await Order.create(order);
  const code = generateCodeOrder(newOrder["id"]);
  await Order.update({
    code: code
  }, {
    where: {
      id: newOrder["id"]
    }
  });
  //End lưu vào order

  //Lưu vào order item
  for (const item of data.cart) {
    const tour = await Tour.findOne({
      where: {
        id: item["tourId"],
        deleted: false
      },
      raw: true
    })
    let dataOrderItem = {
      orderId: newOrder["id"],
      tourId: item["tourId"],
      quantity: item["quantity"],
      price: tour["price"],
      discount: tour["discount"],
      timeStart: tour["timeStart"]
    }
    await OrderItem.create(dataOrderItem);
  }
  //End lưu vào order item

  res.json({
    code: 200,
    message: "Đặt hành thành công",
    orderCode: code
  });
}

//[GET] /success
export const success = async (req: Request, res: Response) => {
  const orderCode = req.query.orderCode;
  console.log(orderCode);

  res.render("client/pages/order/success", {
    pageTitle: "Đặt hàng thành công"
  });
}