import { Request, Response } from "express";
import Account from "../../models/account.model";
import { systemConfig } from "../../config/system";
import md5 from "md5";
import { generateToken } from "../../helper/generate.helper";

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
    req.body["password"] = md5(req.body["password"]);
    req.body["token"] = generateToken(20);
    await Account.create(req.body);
    res.redirect(`${systemConfig.prefixAdmin}/accounts/login`);
  } else {
    req["flash"]("error", "Email đã tồn tại");
    res.redirect("back");
  }
}

//[GET] /admin/accounts/login
export const login = async (req: Request, res: Response) => {
  res.render('admin/pages/accounts/login.pug', {
    pageTitle: "Đăng nhập"
  })
}

//[POST] /admin/accounts/loginPOST
export const loginPOST = async (req: Request, res: Response) => {
  const emailExist = await Account.findOne({
    where: {
      email: req.body.email,
      deleted: false
    },
    raw: true
  });
  if (!emailExist) {
    req["flash"]("error", "Email không tồn tại");
    res.redirect("back");
  } else {
    if (emailExist["password"] === md5(req.body.password)) {
      res["cookie"]("token", emailExist["token"]);
      res.redirect(`${systemConfig.prefixAdmin}/categories`);
    } else {
      req["flash"]("error", "Mật khẩu không chính xác");
      res.redirect("back");
    }
  }
}

//[GET] /admin/accounts/logout
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/accounts/login`);
}