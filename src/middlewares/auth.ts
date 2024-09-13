import {AuthData} from "@/types/AuthData";
import BaseError from "@/utils/errors/baseError";
import "dotenv/config";
import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) {
    res.sendStatus(401);
  } else {
    if (!process.env.JWTKEY) {
      throw new BaseError(
        "Incorrect env variable",
        500,
        false,
        "Environment variable for JWT secret key is undefined."
      );
    }
    const token = bearerHeader.split(" ")[1];

    jwt.verify(token, process.env.JWTKEY, (err, authData) => {
      if (err) {
        res.status(401).send(err.message);
      } else {
        req.context = req.context ?? {};
        req.context.authData = authData as unknown as AuthData;
        next();
      }
    });
  }
};
