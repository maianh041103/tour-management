import { CategoryRoutes } from "./category.route";
import { TourRoutes } from "./tour.route";
import { systemConfig } from "../../config/system";
import { AccountRoutes } from "./account.route";

export const adminRoute = (app) => {
  app.use(`${systemConfig.prefixAdmin}/categories`, CategoryRoutes);
  app.use(`${systemConfig.prefixAdmin}/tours`, TourRoutes);
  app.use(`${systemConfig.prefixAdmin}/accounts`, AccountRoutes);
}