import db from "@/database";
import Api404Error from "@/utils/errors/api404Error";

const user = {
  getAll: async () => {
    try {
      const users = await db.user.findMany();
      console.log(users);
      if (!users.length) {
        throw new Api404Error(`Users not found.`);
      }
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
    }
  },
  getByUsername: async (username: string) => {
    return await db.user.findUnique({
      where: {
        username,
      },
    });
  },
};

export default user;
