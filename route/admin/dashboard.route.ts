import express, { Router } from "express";
import * as controller from "../../controller/admin/dashboard.controller";

const route: Router = express.Router();

route.get('/', controller.index);

export const DashboardRoutes = route;