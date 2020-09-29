import { ApolloServer } from "apollo-server-express";
import UserResolver from "../resolvers/user";
import { buildSchema } from "type-graphql";
import TechnologyResolver from "../resolvers/technology";

export const createApolloTestServerWithSession = async (userId: number) => {
  return new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, TechnologyResolver],
      validate: true,
    }),
    context: () => ({
      req: { session: { userId } },
    }),
  });
};
