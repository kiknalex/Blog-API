import {ValidationError} from "express-validator";

const handleValidationErrors = (errors: Array<ValidationError>) => {
  return errors.map((error) => {
    if (error.type === "field") {
      return {
        field: error.path,
        message: error.msg,
      };
    } else {
      return {
        message: error.msg,
      };
    }
  });
};

export default handleValidationErrors;
