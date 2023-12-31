import { CategoryRoutes } from "./category.route";
import { TourRoutes } from "./tour.route";
import { systemConfig } from "../../config/system";
import { AccountRoutes } from "./account.route";
import { UploadRoutes } from "./upload.route";
import { RoleRoutes } from "./role.route";
import { AccountsRouters } from "./accounts.route";
import { DashboardRoutes } from "./dashboard.route";

import { auth } from "../../middlerware/admin/auth.middlerware";

export const adminRoute = (app) => {
  app.use(`${systemConfig.prefixAdmin}/categories`, auth, CategoryRoutes);
  app.use(`${systemConfig.prefixAdmin}/tours`, auth, TourRoutes);
  app.use(`${systemConfig.prefixAdmin}`, AccountRoutes);
  app.use(`${systemConfig.prefixAdmin}/upload`, auth, UploadRoutes);
  app.use(`${systemConfig.prefixAdmin}/roles`, auth, RoleRoutes);
  app.use(`${systemConfig.prefixAdmin}/accounts`, auth, AccountsRouters);
  app.use(`${systemConfig.prefixAdmin}/dashboard`, auth, DashboardRoutes);
}