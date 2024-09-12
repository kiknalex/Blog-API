import db from "@/database";
import {checkPrismaErrors} from "@/utils/errors/prismaErrors";

const auth = {
  createUserRecord: async (username: string, password: string) => {
    try {
      await db.user.create({
        data: {
          username: username,
          password: password,
        },
      });
    } catch (error) {
      checkPrismaErrors(error);
    }
  },
  getUserWithPassword: async (username: string) => {
    try {
      const user = await db.user.findUnique({
        where: {
          username,
        },
        omit: {
          password: false,
        },
      });
      return user;
    } catch (error) {
      checkPrismaErrors(error);
    }
  },
};

export default auth;
