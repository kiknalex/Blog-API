import {NextFunction, Request, Response} from "express";

export type MiddlewareArguments = {
  req: Request;
  res: Response;
  next: NextFunction;
};
