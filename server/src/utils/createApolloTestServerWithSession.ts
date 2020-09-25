import { ApolloServer } from "apollo-server-express";
import UserResolver from "../resolvers/user";
import { buildSchema } from "type-graphql";

export const createApolloTestServerWithSession = async (userId: number) => {
  return new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: true,
    }),
    context: () => ({
      req: { session: { userId } },
    }),
  });
};
