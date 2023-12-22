import express, { Request, Response, Express } from "express";
import sequelize from "./config/database";
import dotenv from "dotenv";
import clientRoute from "./route/client/index.route";

dotenv.config();
const port: Number | String = process.env.PORT || 3000;
const app: Express = express();

//Nhúng pug
app.set('views', './views');
app.set('view engine', 'pug');
//End nhúng pug

//Nhúng file tĩnh
app.use(express.static("public"));
//End nhúng file tĩnh

//Nhúng route
clientRoute(app);
//End nhúng route

//Nhúng database
sequelize;
//End nhúng database



app.listen(port, () => {
  console.log("Port : " + port);
})