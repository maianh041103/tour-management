import express, { Router } from "express";
import * as controller from "../../controller/client/tour.controller";

const route: Router = express.Router();

route.get("/:slugCategory", controller.index);

route.get("/detail/:slugTour", controller.detail);

export const TourRoutes: Router = route;