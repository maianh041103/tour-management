import express, { Router } from "express";
import * as controller from "../../controller/admin/role.controller";

const route: Router = express.Router();

route.get("/", controller.index);

route.get("/create", controller.create);

route.post("/create", controller.createPOST);

route.get("/detail/:id", controller.detail);

route.get("/edit/:id", controller.edit);

route.patch("/edit/:id", controller.editPATCH);

route.delete("/delete/:id", controller.deleteItem);

route.get("/permissions", controller.permission);

route.patch("/permissions", controller.permissionPATCH);

export const RoleRoutes = route;