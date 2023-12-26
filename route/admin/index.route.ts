import { CategoryRoutes } from "./category.route";
import { systemConfig } from "../../config/system";
export const adminRoute = (app) => {
  app.use(`${systemConfig.prefixAdmin}/categories`, CategoryRoutes);
}