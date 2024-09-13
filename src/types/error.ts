import {NextFunction, Request, Response} from "express";
import {ValidationError} from "express-validator";

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

export type ValidationErrors = Array<{
  field?: string;
  message: string;
}>;
