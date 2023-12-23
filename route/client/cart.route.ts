import express, { Router } from "express";
import * as controller from "../../controller/client/cart.controller";

const route: Router = express.Router();

route.get('/', controller.index);

export const CartRoutes = route;