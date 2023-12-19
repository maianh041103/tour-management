import express, { Request, Response, Express } from "express";

const port: Number = 3000;

const app: Express = express();

//Nhúng pug
app.set('views', './views');
app.set('view engine', 'pug');
//End nhúng pug

app.get("/tours", (req: Request, res: Response) => {
  res.render('client/tours/index');
})

app.listen(port, () => {
  console.log("Port : " + port);
})