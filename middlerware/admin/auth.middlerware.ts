import { Request, Response, NextFunction } from "express";
import { systemConfig } from "../../config/system";
import Account from "../../models/account.model";
import Role from "../../models/role.model";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/login`);
  } else {
    const account = await Account.findOne({
      where: {
        token: req.cookies.token,
        deleted: false
      },
      raw: true
    });
    const role = await Role.findOne({
      where: {
        id: account["role_id"],
        deleted: false
      },
      raw: true
    });
    account["role"] = role;
    res.locals.account = account;
    next();
  }
}