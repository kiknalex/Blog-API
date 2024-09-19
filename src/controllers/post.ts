import {isAdmin, verifyToken} from "@/middlewares/auth";
import models from "@/models";
import {ValidationErrors} from "@/types/error";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithParamsAndQuery,
  RequestWithQuery,
} from "@/types/Request";
import {Query} from "express-serve-static-core";
import handleValidationErrors from "@/utils/errors/validationErrorHandler";
import {validateEditPost, validatePost} from "@/utils/validators/content";
import {Post} from "@prisma/client";
import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {PostsResponseType} from "@/types/Response";
import Api400Error from "@/utils/errors/api400Error";
import {validatePaginationQuery} from "@/utils/validators/queries";

const post = {
  getAll: [
    ...validatePaginationQuery,
    async (
      req: RequestWithQuery<{page?: string; limit?: string}>,
      res: Response<PostsResponseType>,
      next: NextFunction
    ) => {
      const page = parseInt(req.query?.page ?? "1");
      const limit = parseInt(req.query?.limit ?? "100");

      if (isNaN(page) || isNaN(limit)) {
        next(new Api400Error("Page and Limit queries must be numbers"));
        return;
      }
      try {
        const posts = await models.post.getAll(page, limit);
        res.json(posts);
      } catch (error) {
        next(error);
      }
    },
  ],
  getById: async (
    req: RequestWithParams<{postId: string}>,
    res: Response<Post>,
    next: NextFunction
  ) => {
    const postId = req.params.postId;
    try {
      const post = await models.post.getById(+postId);
      res.json(post);
    } catch (error) {
      next(error);
    }
  },
  create: [
    ...validatePost,
    verifyToken,
    async (
      req: RequestWithBody<{title: string; content: string}>,
      res: Response<string | ValidationErrors>,
      next: NextFunction
    ) => {
      const errors = validationResult(req).array();
      if (errors.length) {
        res.status(400).json(handleValidationErrors(errors));
        return;
      }
      const userId = req.context!.authData!.userId;

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
    async (
      req: RequestWithParamsAndBody<
        {postId: string},
        {title: string; content: string}
      >,
      res: Response<Post | ValidationErrors>,
      next: NextFunction
    ) => {
      const errors = validationResult(req).array();
      if (errors.length) {
        res.status(400).json(handleValidationErrors(errors));
        return;
      }
      const userId = req.context!.authData!.userId;
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
    async (
      req: RequestWithParams<{postId: string}>,
      res: Response<string>,
      next: NextFunction
    ) => {
      const userId = req.context!.authData!.userId;
      const postId = +req.params.postId;

      try {
        await models.post.delete(postId, userId);
        res.send(`Post with id: ${postId} successfully deleted.`);
      } catch (error) {
        next(error);
      }
    },
  ],
  editPublicity: [
    verifyToken,
    async (
      req: RequestWithParamsAndQuery<
        {postId: string},
        Query // TO FIX: Typescript error if type object
      >,
      res: Response<string>,
      next: NextFunction
    ) => {
      const postId = +req.params.postId;
      const isPublished = req.query.published === "true";
      try {
        await models.post.editPublished(postId, isPublished);
        const publishedAction = isPublished ? "published" : "unpublished";
        res.send(`Post ${publishedAction}`);
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
        req: RequestWithParams<{postId: string}>,
        res: Response<string>,
        next: NextFunction
      ) => {
        const postId = +req.params.postId;
        try {
          await models.post.admin.delete(postId);
          res.send("Post deleted.");
        } catch (error) {
          next(error);
        }
      },
    ],
  },
};

export default post;
