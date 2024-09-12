import {verifyToken} from "@/middlewares/auth";
import models from "@/models";
import handleValidationErrors from "@/utils/errors/validationErrorHandler";
import {validateComment} from "@/utils/validators/content";
import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

const comment = {
  getAllForPost: async (req: Request, res: Response, next: NextFunction) => {
    const postId = +req.params.postId;
    try {
      const comments = await models.comment.getAllForPost(postId);
      res.json(comments);
    } catch (error) {
      next(error);
    }
  },
  create: [
    validateComment,
    async function anonCreate(req: Request, res: Response, next: NextFunction) {
      if (!req.query.anon === true) {
        next();
      } else {
        const errors = validationResult(req).array();
        if (errors.length) {
          res.status(400).json(handleValidationErrors(errors));
          return;
        }
        const postId = +req.params.postId;
        try {
          await models.comment.create(postId, {content: req.body.content});
          res.send(`Comment created.`);
        } catch (error) {
          next(error);
        }
      }
    },
    verifyToken,
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req).array();
      if (errors.length) {
        res.status(400).json(handleValidationErrors(errors));
        return;
      }
      const postId = +req.params.postId;
      const userId = req.context!.authData.userId;

      try {
        await models.comment.create(
          postId,
          {
            content: req.body.content,
          },
          userId
        );
        res.send("Success!");
      } catch (error) {
        next(error);
      }
    },
  ],
  edit: [
    validateComment,
    verifyToken,
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req).array();
      if (errors.length) {
        res.status(400).json(handleValidationErrors(errors));
        return;
      }
      const userId = req.context!.authData.userId;
      const commentId = +req.params.commentId;
      try {
        const newComment = await models.comment.edit(commentId, userId, {
          content: req.body.content,
        });
        res.json(newComment);
      } catch (error) {
        next(error);
      }
    },
  ],
  delete: [
    verifyToken,
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.context!.authData.userId;
      const commentId = +req.params.commentId;

      try {
        await models.comment.delete(commentId, userId);
        res.send(`Comment with id: ${commentId} successfully deleted.`);
      } catch (error) {
        next(error);
      }
    },
  ],
};

export default comment;
