import {verifyToken} from "@/middlewares/auth";
import {Request, Response} from "express";

const post = {
  createPost: [
    verifyToken,
    async (req: Request, res: Response) => {
      const userId = req.context?.authData?.userId;
      if (!userId) {
        res.status(401).send("Unauthorized.");
      } else {
        res.json({
          message: "Post created.",
          user: req.context!.authData,
        });
      }
    },
  ],
};

export default post;
