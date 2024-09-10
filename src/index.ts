import express, {Express, Request, Response} from "express";
import "dotenv/config";
import routes from "./routes";
import models from "./models";

const app = express();

app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});
app.use("/users", routes.user);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(process.env.PORT, () => {
  console.log("App is listening on port " + process.env.PORT);
});
