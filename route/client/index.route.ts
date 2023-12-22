import { TourRoutes } from "./tour.route";
import { CategoryRoutes } from "./category.route";

const clientRoute = (app => {
  app.use('/tours', TourRoutes);
  app.use('/categories', CategoryRoutes);
})

export default clientRoute;