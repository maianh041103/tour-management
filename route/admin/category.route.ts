import express, { Router } from "express";
import * as controller from "../../controller/admin/category.controller";
import multer from "multer";
import * as uploadToClound from "../../middlerware/admin/upload.middlerware";
const upload = multer();

const route: Router = express.Router();

route.get('/', controller.index);

route.get('/create', controller.create);

route.post('/create', upload.single("image"), uploadToClound.uploadSingle, controller.createPOST);

route.get('/detail/:id', controller.detail);

route.get('/edit/:id', controller.edit);

route.patch('/edit/:id', upload.single("image"), uploadToClound.uploadSingle, controller.editPATCH);

route.delete('/delete/:id', controller.deleteItem);

route.patch('/change-status', controller.changeStatus);

export const CategoryRoutes = route;