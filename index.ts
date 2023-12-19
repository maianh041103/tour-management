import express, { Request, Response, Express } from "express";
import sequelize from "./config/database";
import dotenv from "dotenv";
import Tour from "./models/tour.model";
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

app.get("/tours", async (req: Request, res: Response) => {
  const tours = await Tour.findAll({
    where: {
      deleted: false,
      status: "active"
    },
    raw: true
  });

  res.render('client/tours/index', {
    title: "Danh sách tour",
    tours: tours
  });
})

app.listen(port, () => {
  console.log("Port : " + port);
})