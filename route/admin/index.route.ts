import { CategoryRoutes } from "./category.route";
import { TourRoutes } from "./tour.route";
import { systemConfig } from "../../config/system";

export const adminRoute = (app) => {
  app.use(`${systemConfig.prefixAdmin}/categories`, CategoryRoutes);
  app.use(`${systemConfig.prefixAdmin}/tours`, TourRoutes);
}