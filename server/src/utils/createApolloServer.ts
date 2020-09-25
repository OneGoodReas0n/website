import { ApolloServer } from "apollo-server-express";
import UserResolver from "../resolvers/user";
import { Context } from "../types";
import { buildSchema } from "type-graphql";

export const createApolloServer = async () => {
  return new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: true,
    }),
    context: ({ req, res }: Context): Context => ({
      req,
      res,
    }),
  });
};
