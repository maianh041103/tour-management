import express, { Router } from "express";
import * as controller from "../../controller/client/category.controller";

const route: Router = express.Router();

route.get('/', controller.index);

export const CategoryRoutes = route;