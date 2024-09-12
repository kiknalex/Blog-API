import {verifyToken} from "@/middlewares/auth";
import models from "@/models";
import handleValidationErrors from "@/utils/errors/validationErrorHandler";
import {validateEditPost, validatePost} from "@/utils/validators/content";
import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

const post = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await models.post.getAll();
      res.json(posts);
    } catch (error) {
      next(error);
    }
  },
  create: [
    ...validatePost,
    verifyToken,
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req).array();
      if (errors.length) {
        res.status(400).json(handleValidationErrors(errors));
        return;
      }
      const userId = req.context!.authData.userId;

      try {
        await models.post.create(userId, {
          title: req.body.title,
          content: req.body.content,
        });
        res.send("Success!");
      } catch (error) {
        next(error);
      }
    },
  ],
  edit: [
    ...validateEditPost,
    verifyToken,
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req).array();
      if (errors.length) {
        res.status(400).json(handleValidationErrors(errors));
        return;
      }
      const userId = req.context!.authData.userId;
      const postId = +req.params.postId;
      try {
        const newPost = await models.post.edit(postId, userId, {
          title: req.body.title,
          content: req.body.content,
        });
        res.json(newPost);
      } catch (error) {
        next(error);
      }
    },
  ],
  delete: [
    verifyToken,
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.context!.authData.userId;
      const postId = +req.params.postId;

      try {
        await models.post.delete(postId, userId);
        res.send(`Post with id: ${postId} successfully deleted.`);
      } catch (error) {
        next(error);
      }
    },
  ],
};

export default post;
