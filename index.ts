import express, { Request, Response, Express } from "express";
import sequelize from "./config/database";
import dotenv from "dotenv";
dotenv.config();
const port: Number | String = process.env.PORT || 3000;
const app: Express = express();

//Nhúng pug
app.set('views', './views');
app.set('view engine', 'pug');
//End nhúng pug

//Nhúng database
sequelize;
//End nhúng database

app.get("/tours", (req: Request, res: Response) => {
  res.render('client/tours/index');
})

app.listen(port, () => {
  console.log("Port : " + port);
})