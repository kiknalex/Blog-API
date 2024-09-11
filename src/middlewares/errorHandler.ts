import {ErrorHandler} from "@/types/error";
import BaseError from "@utils/errors/baseError";

const logError: ErrorHandler = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

const returnError: ErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).send(err.message);
};

const isOperationalError = (error: Error) => {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
};

export {logError, returnError, isOperationalError};
