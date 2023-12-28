import { Request, Response, NextFunction } from "express";
import { systemConfig } from "../../config/system";
import Account from "../../models/account.model";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts/login`);
  } else {
    const account = await Account.findOne({
      where: {
        token: req.cookies.token,
        deleted: false
      },
      raw: true
    });
    res.locals.account = account;
    next();
  }
}