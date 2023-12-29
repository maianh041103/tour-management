import express, { Router } from "express";
import * as controller from "../../controller/admin/account.controller";
import { auth } from "../../middlerware/admin/auth.middlerware";
import multer from "multer";
import * as uploadToClound from "../../middlerware/admin/upload.middlerware";
const upload = multer();

const route: Router = express.Router();

route.get('/register', controller.register);

route.post('/register', controller.regiterPOST);

route.get("/login", controller.login);

route.post("/login", controller.loginPOST);

route.get("/logout", controller.logout);

route.get("/info", auth, controller.info);

route.get("/edit", auth, controller.edit);

route.patch("/edit", auth, upload.single("avatar"), uploadToClound.uploadSingle, controller.editPATCH);

route.get("/change-password", auth, controller.changePassword);

route.patch("/change-password", auth, controller.changePasswordPATCH);

export const AccountRoutes = route;