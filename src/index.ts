import express, {Express, Request, Response} from "express";
import "dotenv/config";
import routes from "./routes";
import models from "./models";
import {isOperationalError, logError} from "./middlewares/errorHandler";
import {CustomError} from "./types/error";

const app = express();

app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/users", routes.user);
app.use(logError);
process.on("unhandledRejection", (error) => {
  throw error;
});

process.on("uncaughtException", (error: CustomError) => {
  console.error(error.stack);

  if (!isOperationalError(error)) {
    process.exit(1);
  }
});
app.listen(process.env.PORT, () => {
  console.log("App is listening on port " + process.env.PORT);
});
