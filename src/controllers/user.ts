import {NextFunction, Request, Response} from "express";
import models from "@/models";
import {MiddlewareArguments} from "@/types/middleware";

const user = {
  getAll: async ({req, res, next}: MiddlewareArguments) => {
    try {
      const users = await models.user.getAll();
      console.log(users);
      res.json(users);
    } catch (error) {
      next(error);
    }
  },
  getById: async ({req, res, next}: MiddlewareArguments) => {
    const id = 1;
    try {
      const user = await models.user.getById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
};

export default user;
