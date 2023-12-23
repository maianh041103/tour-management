import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import clientRoute from "./route/client/index.route";
import moment from 'moment';
import bodyParser, { BodyParser } from "body-parser";

dotenv.config();
const port: Number | String = process.env.PORT || 3000;
const app: Express = express();

//Nhúng pug
app.set('views', './views');
app.set('view engine', 'pug');
//End nhúng pug

app.locals.moment = moment;

//Nhúng bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//End nhúng bodyParser

//Nhúng file tĩnh
app.use(express.static("public"));
//End nhúng file tĩnh

//Nhúng route
clientRoute(app);
//End nhúng route


app.listen(port, () => {
  console.log("Port : " + port);
})