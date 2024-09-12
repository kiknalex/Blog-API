import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import Api404Error from "./api404Error";
import Api400Error from "./api400Error";

export const checkPrismaErrors = (error: any) => {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.meta?.cause) {
      throw new Api404Error(error.meta.cause + "");
    } else {
      throw new Api400Error(error.message);
    }
  } else {
    throw new Api400Error(error.message);
  }
};
