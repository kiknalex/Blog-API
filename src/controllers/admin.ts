import {isAdmin, verifyToken} from "@/middlewares/auth";
import models from "@/models";
import {RequestWithParams} from "@/types/Request";
import {NextFunction, Response} from "express";

const admin = {
  deletePost: [
    verifyToken,
    isAdmin,
    async (
      req: RequestWithParams<{postId: string}>,
      res: Response<string>,
      next: NextFunction
    ) => {
      const postId = +req.params.postId;
      try {
        await models.admin.deletePost(postId);
        res.send("Post deleted.");
      } catch (error) {
        next(error);
      }
    },
  ],
  deleteComment: [
    verifyToken,
    isAdmin,
    async (
      req: RequestWithParams<{commentId: string}>,
      res: Response<string>,
      next: NextFunction
    ) => {
      const commentId = +req.params.commentId;
      try {
        await models.admin.deleteComment(commentId);
        res.send("Comment deleted.");
      } catch (error) {
        next(error);
      }
    },
  ],
};

export default admin;
