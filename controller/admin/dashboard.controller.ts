import { Request, Response } from "express";

export const index = (req: Request, res: Response) => {
  res.render("admin/pages/dashboard/index.pug", {
    pageTitle: "Trang tổng quan"
  })
}