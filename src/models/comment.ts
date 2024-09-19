import db from "@/database";
import Api400Error from "@/utils/errors/api400Error";
import Api404Error from "@/utils/errors/api404Error";
import {checkPrismaErrors} from "@/utils/errors/prismaErrors";

const comment = {
  getAllForPost: async (
    postId: number,
    page: number = 1,
    limit: number = 100
  ) => {
    try {
      const comments = await db.comment.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          postId,
        },
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
        orderBy: {
          date_posted: "desc",
        },
      });
      const commentsCountTotal = await db.post.count();

      const hasMore = page * limit < commentsCountTotal;

      const meta = {
        totalCount: commentsCountTotal,
        currentPage: page,
        nextPage: hasMore ? page + 1 : null,
      };
      return {comments, meta};
    } catch (error) {
      checkPrismaErrors(error);
    }
  },
  create: async (
    postId: number,
    data: {
      content: string;
      date?: Date;
    },
    authorId?: number
  ) => {
    try {
      await db.comment.create({
        data: {
          ...data,
          postId,
          authorId,
        },
      });
    } catch (error) {
      checkPrismaErrors(error);
    }
  },
  edit: async (
    commentId: number,
    authorId: number,
    data: {content: string}
  ) => {
    if (!data.content) {
      throw new Api400Error("Content field is required");
    }
    try {
      const comment = await db.comment.update({
        where: {
          id: commentId,
          authorId: authorId,
        },
        data,
      });
      return comment;
    } catch (error) {
      checkPrismaErrors(error);
    }
  },
  delete: async (commentId: number, authorId: number) => {
    try {
      const deletedItem = await db.comment.delete({
        where: {
          id: commentId,
          authorId: authorId,
        },
      });
      return deletedItem;
    } catch (error) {
      checkPrismaErrors(error);
    }
  },
  admin: {
    delete: async (id: number) => {
      try {
        await db.comment.delete({
          where: {
            id,
          },
        });
      } catch (error) {
        throw new Api404Error("Not found.");
      }
    },
  },
};

export default comment;
