import express, { Router } from "express";
import * as controller from "../../controller/admin/tour.controller";

const route: Router = express.Router();

route.get("/", controller.index);

route.get("/create", controller.create);

route.post("/create", controller.createPOST);

export const TourRoutes: Router = route;