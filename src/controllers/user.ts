import {NextFunction, Request, Response} from "express";
import models from "@/models";

const user = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await models.user.getAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const user = await models.user.getById(+id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
};

export default user;
