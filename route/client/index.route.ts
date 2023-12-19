import { TourRoutes } from "./tour.route";

const clientRoute = (app => {
  app.use('/tours', TourRoutes);
})

export default clientRoute;