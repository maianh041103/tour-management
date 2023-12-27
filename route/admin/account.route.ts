import express, { Router } from "express";
import * as controller from "../../controller/admin/account.controller";

const route: Router = express.Router();

route.get('/register', controller.register);

route.post('/register', controller.regiterPOST);

route.get("/login", controller.login);

route.post("/login", controller.loginPOST);

route.get("/logout", controller.logout);

export const AccountRoutes = route;