import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import { Context } from "src/types";

export const isAuth: Middleware<Context> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("not authenticated");
  }
  return next();
};
