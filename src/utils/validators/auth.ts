import db from "@/database";
import user from "@/models/user";
import {body} from "express-validator";

export const validateLogin = body("username")
  .isLength({min: 3, max: 20})
  .withMessage("Length must be between 3 to 20 characters.")
  .isAlphanumeric()
  .withMessage("Username must consist of letters and/or numbers")
  .custom(async (value) => {
    const username = await user.getByUsername(value);
    if (username) {
      throw new Error("Username already exists");
    }
  })
  .withMessage("Username already exists")
  .trim()
  .escape();

export const validatePassword = body("password")
  .isLength({min: 8})
  .withMessage("Password must be at least 8 characters.")
  .not()
  .matches(/[^ -~]/)
  .withMessage(
    "Password contains prohibited symbols. Only ASCII characters in range of 32 to 126 are allowed."
  )
  .isStrongPassword()
  .withMessage("Password is not strong enough.");
