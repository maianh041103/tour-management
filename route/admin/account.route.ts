import express, { Router } from "express";
import * as controller from "../../controller/admin/account.controller";

const route: Router = express.Router();

route.get('/register', controller.register);

route.post('/register', controller.regiterPOST);

export const AccountRoutes = route;