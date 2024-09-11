import {body} from "express-validator";

export const validateLogin = body("username")
  .isLength({min: 3, max: 20})
  .withMessage("Length must be between 3 to 20 characters.")
  .isAlphanumeric()
  .withMessage("Username must consist of letters and/or numbers")
  .trim()
  .escape();

export const validatePassword = body("password")
  .isLength({min: 8})
  .withMessage("Password must be longer than 7 characters.")
  .not()
  .matches(/[^ -~]/)
  .withMessage(
    "Password contains prohibited symbols. Only ASCII characters in range of 32 to 126 are allowed."
  )
  .isStrongPassword()
  .withMessage("Password is not strong enough.");
