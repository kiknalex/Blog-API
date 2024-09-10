import {NextFunction, Request, Response} from "express";
import models from "@/models";

const user = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await models.user.getAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },
};

export default user;
