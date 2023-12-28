import express, { Router } from "express";
import * as controller from "../../controller/admin/tour.controller";
import multer from "multer";
const upload = multer();
import * as uploadToClound from "../../middlerware/admin/upload.middlerware";

const route: Router = express.Router();

route.get("/", controller.index);

route.get("/create", controller.create);

route.post("/create", upload.fields([{ name: 'images', maxCount: 10 }]), uploadToClound.uploadFields, controller.createPOST);

route.patch("/change-status", controller.changeStatus);

route.get("/detail/:id", controller.detail);

route.get("/edit/:id", controller.edit);

route.patch("/edit/:id", upload.fields([{ name: 'images', maxCount: 10 }]), uploadToClound.uploadFields, controller.editPATCH);

route.delete("/delete/:id", controller.deleteItem);

export const TourRoutes: Router = route;