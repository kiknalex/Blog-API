import {isAdmin, verifyToken} from "@/middlewares/auth";
import models from "@/models";
import {ValidationErrors} from "@/types/error";
import {Query} from "express-serve-static-core";
import {
  RequestWithAll,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithParamsAndQuery,
} from "@/types/Request";
import handleValidationErrors from "@/utils/errors/validationErrorHandler";
import {validateComment} from "@/utils/validators/content";
import {Comment} from "@prisma/client";
import {NextFunction, Response} from "express";
import {validationResult} from "express-validator";
import Api400Error from "@/utils/errors/api400Error";
import {validatePaginationQuery} from "@/utils/validators/queries";
import {CommentsResponseType} from "@/types/Response";

const comment = {
  getAllForPost: [
    ...validatePaginationQuery,
    async (
      req: RequestWithParamsAndQuery<
        {postId: string},
        {page?: string; limit?: string}
      >,
      res: Response<CommentsResponseType>,
      next: NextFunction
    ) => {
      const postId = +req.params.postId;
      const page = parseInt(req.query?.page ?? "1");
      const limit = parseInt(req.query?.limit ?? "100");

      if (isNaN(page) || isNaN(limit)) {
        next(new Api400Error("Page and Limit queries must be numbers"));
        return;
      }
      try {
        const comments = await models.comment.getAllForPost(
          postId,
          page,
          limit
        );
        res.json(comments);
      } catch (error) {
        next(error);
      }
    },
  ],
  create: [
    validateComment,
    async function anonCreate(
      req: RequestWithAll<{postId: string}, {content: string}, Query>,
      res: Response<string | ValidationErrors>,
      next: NextFunction
    ) {
      if (req.query.anon === "true") {
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
    async (
      req: RequestWithParamsAndBody<
        {postId: string},
        {title: string; content: string}
      >,
      res: Response<string | ValidationErrors>,
      next: NextFunction
    ) => {
      const errors = validationResult(req).array();
      if (errors.length) {
        res.status(400).json(handleValidationErrors(errors));
        return;
      }
      const postId = +req.params.postId;
      const userId = req.context!.authData?.userId;

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
    async (
      req: RequestWithParams<{commentId: string}>,
      res: Response<Comment | ValidationErrors>,
      next: NextFunction
    ) => {
      const errors = validationResult(req).array();
      if (errors.length) {
        res.status(400).json(handleValidationErrors(errors));
        return;
      }
      const userId = req.context!.authData!.userId;
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
    async (
      req: RequestWithParams<{commentId: string}>,
      res: Response<string>,
      next: NextFunction
    ) => {
      const userId = req.context!.authData!.userId!;
      const commentId = +req.params.commentId;

      try {
        await models.comment.delete(commentId, userId);
        res.send(`Comment with id: ${commentId} successfully deleted.`);
      } catch (error) {
        next(error);
      }
    },
  ],
  admin: {
    delete: [
      verifyToken,
      isAdmin,
      async (
        req: RequestWithParams<{commentId: string}>,
        res: Response<string>,
        next: NextFunction
      ) => {
        const commentId = +req.params.commentId;
        try {
          await models.comment.admin.delete(commentId);
          res.send("Comment deleted.");
        } catch (error) {
          next(error);
        }
      },
    ],
  },
};

export default comment;
