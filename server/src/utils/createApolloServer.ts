import { ApolloServer } from "apollo-server-express";
import UserResolver from "../resolvers/user";
import { Context } from "../types";
import { buildSchema } from "type-graphql";
import TechnologyResolver from "../resolvers/technology";
import ProjectResolver from "../resolvers/project";
import BotResolver from "../resolvers/bot";

export const createApolloServer = async () => {
  return new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        TechnologyResolver,
        ProjectResolver,
        BotResolver,
      ],
      validate: true,
    }),
    context: ({ req, res }: Context): Context => ({
      req,
      res,
    }),
  });
};
