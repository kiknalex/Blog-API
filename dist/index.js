"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use("/users", routes_1.default.user);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(process.env.PORT, () => {
    console.log("App is listening on port " + process.env.PORT);
});
