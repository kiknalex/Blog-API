import db from "@/database";
import Api404Error from "@/utils/errors/api404Error";
import BaseError from "@/utils/errors/baseError";

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
      console.error(error);
      throw new BaseError("Register error", 400, true, String(error));
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
      console.error(error);
    }
  },
};

export default auth;
