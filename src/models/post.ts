import db from "@/database";
import Api400Error from "@/utils/errors/api400Error";
import Api404Error from "@/utils/errors/api404Error";
import {checkPrismaErrors} from "@/utils/errors/prismaErrors";

const post = {
  getAll: async () => {
    try {
      const posts = await db.post.findMany();
      if (!posts.length) {
        throw new Api404Error("No posts found.");
      }
      return posts;
    } catch (error) {
      checkPrismaErrors(error);
    }
  },
  getById: async (id: number) => {
    try {
      const post = await db.post.findUnique({
        where: {
          id,
        },
      });
      if (post === null) {
        throw new Api404Error(`Post with id: ${id} not found.`);
      }
      return post;
    } catch (error) {
      checkPrismaErrors(error);
    }
  },
  create: async (
    authorId: number,
    data: {
      title: string;
      content: string;
      date?: Date;
    }
  ) => {
    try {
      await db.post.create({
        data: {
          ...data,
          authorId,
        },
      });
    } catch (error) {
      checkPrismaErrors(error);
    }
  },
  edit: async (
    postId: number,
    authorId: number,
    data: {title?: string; content?: string}
  ) => {
    if (!data.title && !data.content) {
      throw new Api400Error("Either title or content field is required");
    }
    try {
      const post = await db.post.update({
        where: {
          id: postId,
          authorId: authorId,
        },
        data,
      });
      return post;
    } catch (error) {
      checkPrismaErrors(error);
    }
  },
  delete: async (postId: number, authorId: number) => {
    try {
      const deletedItem = await db.post.delete({
        where: {
          id: postId,
          authorId: authorId,
        },
      });
      return deletedItem;
    } catch (error) {
      checkPrismaErrors(error);
    }
  },
  editPublished: async (postId: number, isPublished: boolean) => {
    try {
      await db.post.update({
        where: {
          id: postId,
        },
        data: {
          published: isPublished,
        },
      });
    } catch (error) {
      throw new Api404Error("Not found.");
    }
  },
  admin: {
    delete: async (id: number) => {
      try {
        await db.post.delete({
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

export default post;
