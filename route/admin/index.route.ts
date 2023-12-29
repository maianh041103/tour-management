import { CategoryRoutes } from "./category.route";
import { TourRoutes } from "./tour.route";
import { systemConfig } from "../../config/system";
import { AccountRoutes } from "./account.route";
import { UploadRoutes } from "./upload.route";
import { RoleRoutes } from "./role.route";

import { auth } from "../../middlerware/admin/auth.middlerware";

export const adminRoute = (app) => {
  app.use(`${systemConfig.prefixAdmin}/categories`, auth, CategoryRoutes);
  app.use(`${systemConfig.prefixAdmin}/tours`, auth, TourRoutes);
  app.use(`${systemConfig.prefixAdmin}/accounts`, AccountRoutes);
  app.use(`${systemConfig.prefixAdmin}/upload`, auth, UploadRoutes);
  app.use(`${systemConfig.prefixAdmin}/roles`, auth, RoleRoutes);
}