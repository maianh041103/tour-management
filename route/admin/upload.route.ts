import express, { Router } from "express";
import * as controller from "../../controller/admin/upload.controller";
import multer from "multer";
import * as uploadToClound from "../../middlerware/admin/upload.middlerware";

const upload = multer();

const route: Router = Router();

route.post('/', upload.single("file"), uploadToClound.uploadSingle, controller.upload);

export const UploadRoutes = route;