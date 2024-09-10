import {Request, Response} from "express";

const user = {
  getUsers: (req: Request, res: Response) => {
    res.json({user: "kiknalex", posts: "lala"});
  },
};

export default user;
