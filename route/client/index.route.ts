import { TourRoutes } from "./tour.route";
import { CategoryRoutes } from "./category.route";
import { CartRoutes } from "./cart.route";
import { OrderRoutes } from "./orders.route";
import { HomeRoutes } from "./home.route";

const clientRoute = (app => {
  app.use('/tours', TourRoutes);
  app.use('/categories', CategoryRoutes);
  app.use('/cart', CartRoutes);
  app.use('/order', OrderRoutes);
  app.use('/', HomeRoutes);
})

export default clientRoute;