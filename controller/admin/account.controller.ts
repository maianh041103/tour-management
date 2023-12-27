import { Request, Response } from "express";
import Account from "../../models/account.model";
import { systemConfig } from "../../config/system";

//[GET] /admin/accounts/register
export const register = async (req: Request, res: Response) => {
  res.render("admin/pages/accounts/register.pug", {
    pageTitle: "Đăng ký tài khoản"
  })
}

//[POST] /admin/accounts/register
export const regiterPOST = async (req: Request, res: Response) => {
  const email = req.body.email;
  const emailExists = await Account.findOne({
    where: {
      email: email,
      deleted: false
    }
  })
  if (!emailExists) {
    await Account.create(req.body);
    res.redirect(`${systemConfig.prefixAdmin}/categories`);
  } else {
    alert("Email đã tồn tại");
    res.redirect("back");
  }
}