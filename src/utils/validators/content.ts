import {body, oneOf} from "express-validator";

export const validatePost = [
  body("title")
    .notEmpty()
    .withMessage("Title must not be empty.")
    .isLength({max: 50})
    .withMessage("Title must be under 50 characters.")
    .trim()
    .escape(),
  body("content")
    .notEmpty()
    .withMessage("Content must not be empty.")
    .isLength({max: 1000})
    .withMessage("Content must be under 1000 characters.")
    .trim()
    .escape(),
];

export const validateEditPost = [
  oneOf([body("title").notEmpty(), body("content").notEmpty()]),
  body("title")
    .optional({values: "undefined"})
    .isLength({min: 1, max: 50})
    .withMessage("Title must be between 1 to 50 characters.")
    .trim()
    .escape(),
  body("content")
    .optional({values: "undefined"})
    .isLength({min: 1, max: 1000})
    .withMessage("Content must be between 1 to 1000 characters.")
    .trim()
    .escape(),
];

export const validateComment = body("content")
  .isLength({min: 1, max: 300})
  .withMessage("Text must be between 1 to 300 characters.")
  .trim()
  .escape();
