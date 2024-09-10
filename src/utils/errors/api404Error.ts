import httpStatusCodes from "./httpStatusCodes";
import BaseError from "./baseError";

class Api404Error extends BaseError {
  constructor(
    name: string,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "Not found.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

export default Api404Error;
