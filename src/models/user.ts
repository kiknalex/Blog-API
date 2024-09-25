import db from "@/database";
import Api404Error from "@/utils/errors/api404Error";
import BaseError from "@/utils/errors/baseError";
import {checkPrismaErrors} from "@/utils/errors/prismaErrors";

const user = {
  getAll: async () => {
    try {
      const users = await db.user.findMany();
      if (!users.length) {
        throw new Api404Error(`No users exist in a database.`);
      }
      return users;
    } catch (error) {
      checkPrismaErrors(error);
    }
  },
  getById: async (id: number) => {
    try {
      const user = await db.user.findUnique({
        where: {
          id,
        },
        include: {
          posts: {
            take: 12,
            orderBy: {
              date_posted: "desc",
            },
            select: {
              id: true,
              date_posted: true,
              title: true,
              content: true,
              published: true,
              _count: {
                select: {
                  comments: true,
                },
              },
            },
          },
          comments: {
            take: 12,
            orderBy: {
              date_posted: "desc",
            },
            select: {
              id: true,
              content: true,
              date_posted: true,
              postId: true,
            },
          },
        },
      });
      if (user === null) {
        throw new Api404Error(`User with id: ${id} not found.`);
      }
      return user;
    } catch (error) {
      checkPrismaErrors(error);
    }
  },
  getByUsername: async (username: string) => {
    try {
      const user = await db.user.findUnique({
        where: {
          username,
        },
      });
      return user;
    } catch (error) {
      checkPrismaErrors(error);
    }
  },
  isAdmin: async (id: number) => {
    try {
      return await db.user.findUniqueOrThrow({
        where: {
          id,
          role: "ADMIN",
        },
      });
    } catch (error) {
      throw new BaseError(
        "Forbidden.",
        403,
        true,
        "User has no permission to perform this action."
      );
    }
  },
  admin: {
    editRole: async (id: number, role: "USER" | "ADMIN") => {
      try {
        await db.user.update({
          data: {
            role,
          },
          where: {
            id,
          },
        });
      } catch (error) {
        throw new Api404Error("Not found");
      }
    },
  },
};

export default user;
