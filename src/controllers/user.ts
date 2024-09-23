import {NextFunction, Request, Response} from "express";
import models from "@/models";
import {RequestWithParams} from "@/types/Request";
import {UserWithoutPassword} from "@/database/types/UserWithoutPassword";
import {isAdmin, verifyToken} from "@/middlewares/auth";

const user = {
  getAll: async (
    req: Request,
    res: Response<UserWithoutPassword[]>,
    next: NextFunction
  ) => {
    try {
      const users = await models.user.getAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },
  getById: async (
    req: RequestWithParams<{userId: string}>,
    res: Response<UserWithoutPassword>,
    next: NextFunction
  ) => {
    const userId = req.params.userId;
    try {
      const user = await models.user.getById(+userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  admin: {
    grandAdminRole: [
      verifyToken,
      isAdmin,
      async (
        req: RequestWithParams<{userId: string}>,
        res: Response<{message: string}>,
        next: NextFunction
      ) => {
        const userId = +req.params.userId;

        try {
          await models.user.admin.editRole(userId, "ADMIN");
          res.json({message: `Admin privilege granted to id: ${userId}`});
        } catch (error) {
          next(error);
        }
      },
    ],
  },
};

export default user;
