import express, { Router } from "express";
import * as controller from "../../controller/admin/tour.controller";

const route: Router = express.Router();

route.get("/", controller.index);

export const TourRoutes: Router = route;