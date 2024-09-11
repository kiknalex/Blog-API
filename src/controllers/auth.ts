import "dotenv/config";
import {validateLogin, validatePassword} from "@/utils/validators/auth";
import {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import BaseError from "@/utils/errors/baseError";
import models from "@/models";
import jwt from "jsonwebtoken";
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
  loginUser: [
    body("username").escape().trim(),
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await models.auth.getUserWithPassword(req.body.username);
      if (!user) {
        res.status(400).send("Username or password is incorrect.");
        return;
      }

      bcrypt.compare(req.body.password, user.password, (err, matches) => {
        if (err) {
          console.error(err);
          return;
        }
        const jwtSecretKey = process.env.JWTKEY;

        if (!jwtSecretKey) {
          throw new BaseError(
            "Server error",
            500,
            false,
            "Unable to locate JWT secret key in ENV"
          );
        }
        if (matches) {
          jwt.sign(
            {
              userId: user.id,
              username: user.username,
              iat: Math.floor(Date.now() / 1000),
            },
            jwtSecretKey,
            {expiresIn: "1h"},
            (err: Error | null, token: string | undefined) => {
              if (err) {
                console.error(err);
              } else {
                res.json({
                  token,
                });
              }
            }
          );
        } else {
          res.status(400).send("Username or password is incorrect.");
        }
      });
    },
  ],
};

export default auth;
