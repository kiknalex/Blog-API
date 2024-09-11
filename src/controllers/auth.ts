import {validateLogin, validatePassword} from "@/utils/validators/auth";
import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import BaseError from "@/utils/errors/baseError";
import models from "@/models";
const registerValidation = [validateLogin, validatePassword];

const auth = {
  registerUser: [
    ...registerValidation,
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req).array();
      if (errors.length) {
        res.status(400).json(
          errors.map((error) => {
            if (error.type === "field") {
              return {
                field: error.path,
                message: error.msg,
              };
            }
          })
        );
        return;
      }
      const user = await models.user.getByUsername(req.body.username);
      if (user) {
        res.status(400).send("Username already exists");
        return;
      }
      try {
        bcrypt.hash(req.body.password, 10, async (error, hash) => {
          if (error) {
            console.error(error);
            throw new BaseError(
              "Hashing error",
              500,
              false,
              "Encountered an error during hashing"
            );
          } else {
            models.auth.createUserRecord(req.body.username, hash);
            res.send(`New user "${req.body.username}" successfully registered`);
          }
        });
      } catch (error) {
        next(error);
      }
    },
  ],
};

export default auth;
