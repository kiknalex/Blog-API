import {Express} from "express-serve-static-core";
import {Request} from "express";
import {AuthData} from "./AuthData";

declare module "express-serve-static-core" {
  interface Request {
    context?: {
      authData?: AuthData;
    };
  }
}
