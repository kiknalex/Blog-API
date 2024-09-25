import express, {Request, Response} from "express";
import "dotenv/config";
import routes from "./routes";
import {
  isOperationalError,
  logError,
  returnError,
} from "./middlewares/errorHandler";
import {CustomError} from "./types/error";
import cors from "cors";
import controllers from "./controllers";
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/users", routes.user);
app.use("/users", routes.auth);
app.use("/posts", routes.post);
app.use("/posts/:postId/comments", routes.comment);
app.use("/admin", routes.admin);
app.use("/profile", routes.profile);
app.use(logError);
app.use(returnError);

app.get("/profile", controllers.user.getProfile);

process.on("unhandledRejection", (error) => {
  throw error;
});

process.on("uncaughtException", (error: CustomError) => {
  console.error(error.stack);

  if (!isOperationalError(error)) {
    process.exit(1);
  }
});
app.get("/", (req: Request, res: Response) => {
  res.send("https://github.com/kiknalex/Blog-API");
});

app.listen(process.env.PORT, () => {
  console.log("App is listening on port " + process.env.PORT);
});
