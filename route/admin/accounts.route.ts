import express, { Router } from "express";
import * as controller from "../../controller/admin/accounts.controller";
import multer from "multer";
import * as uploadToClound from "../../middlerware/admin/upload.middlerware";

const upload = multer();

const route: Router = express.Router();

route.get('/', controller.index);

route.get('/detail/:id', controller.detail);

route.get('/edit/:id', controller.edit);

route.patch('/edit/:id', upload.single("avatar"), uploadToClound.uploadSingle, controller.editPATCH);

route.delete('/delete/:id', controller.deleteItem);

export const AccountsRouters: Router = route;
