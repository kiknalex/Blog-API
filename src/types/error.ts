import {NextFunction, Request, Response} from "express";

export interface CustomError extends Error {
  statusCode: number;
  isOperational: boolean;
}

export type ErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
