import express, { Request, Response, Express } from "express";

const port: Number = 3000;

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Trang chủ");
})

app.listen(port, () => {
  console.log("Port : " + port);
})