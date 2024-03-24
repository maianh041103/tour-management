import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import clientRoute from "./route/client/index.route";
import moment from 'moment';
import bodyParser, { BodyParser } from "body-parser";
import { systemConfig } from "./config/system";
import { adminRoute } from "./route/admin/index.route";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "express-flash";
import path from "path";
import methodOverride from "method-override";

dotenv.config();
const port: Number | String = process.env.PORT || 3000;
const app: Express = express();

//Nhúng cors
const cors = require('cors');

const corsOptions = {
  origin: 'https://tour-management-sigma.vercel.app',
}

app.use(cors());
//End nhúng cors

//Nhúng pug
app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');
//End nhúng pug

app.locals.moment = moment;
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Nhúng bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//End nhúng bodyParser

//Nhúng flash
app.use(cookieParser('maianh20'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
app.locals.flash = flash;
//End nhúng flash

//Nhúng file tĩnh
app.use(express.static(`${__dirname}/public`));
//End nhúng file tĩnh

//Nhúng methodOverride
app.use(methodOverride('_method'));
//End nhúng methodOverride

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE

//Nhúng route
clientRoute(app);
adminRoute(app);
//End nhúng route


app.listen(port, () => {
  console.log("Port : " + port);
})