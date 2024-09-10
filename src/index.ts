import express, {Express, Request, Response} from "express";
import "dotenv/config";
import routes from "./routes";

const app = express();

app.use("/users", routes.user);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(process.env.PORT, () => {
  console.log("App is listening on port " + process.env.PORT);
});
