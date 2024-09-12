import {NextFunction, Request, Response} from "express";

const comment = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    res.send("Success.");
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    res.send("Success.");
  },
  edit: async (req: Request, res: Response, next: NextFunction) => {
    res.send("Success.");
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    res.send("Success.");
  },
};

export default comment;
