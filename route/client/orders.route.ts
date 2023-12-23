import express, { Router } from "express";
import * as controller from "../../controller/client/orders.controller";

const route: Router = express.Router();

route.post('/', controller.order);

export const OrderRoutes: Router = route;