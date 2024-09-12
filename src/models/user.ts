import db from "@/database";
import Api404Error from "@/utils/errors/api404Error";
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
};

export default user;
