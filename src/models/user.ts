import db from "@/database";
import Api404Error from "@/utils/errors/api404Error";

const user = {
  getAll: async () => {
    try {
      const users = await db.user.findMany();
      if (!users.length) {
        throw new Api404Error(`No users exist in a database.`);
      }
      return users;
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  },
};

export default user;
