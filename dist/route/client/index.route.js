"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tour_route_1 = require("./tour.route");
const category_route_1 = require("./category.route");
const cart_route_1 = require("./cart.route");
const orders_route_1 = require("./orders.route");
const home_route_1 = require("./home.route");
const clientRoute = (app => {
    app.use('/tours', tour_route_1.TourRoutes);
    app.use('/categories', category_route_1.CategoryRoutes);
    app.use('/cart', cart_route_1.CartRoutes);
    app.use('/order', orders_route_1.OrderRoutes);
    app.use('/', home_route_1.HomeRoutes);
});
exports.default = clientRoute;
