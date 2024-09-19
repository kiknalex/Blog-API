import {query} from "express-validator";

export const validatePaginationQuery = [
  query("page").optional().notEmpty().bail().escape(),
  query("limit").optional().notEmpty().bail().escape(),
];
