import db from "@/database";
import Api404Error from "@/utils/errors/api404Error";
import BaseError from "@/utils/errors/baseError";

const admin = {
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
  deletePost: async (id: number) => {
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
  deleteComment: async (id: number) => {
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
  grantAdminPrivileges: async (id: number) => {
    return "test";
  },
};
export default admin;
