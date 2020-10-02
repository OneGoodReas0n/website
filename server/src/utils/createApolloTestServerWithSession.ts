import { ApolloServer } from "apollo-server-express";
import UserResolver from "../resolvers/user";
import { buildSchema } from "type-graphql";
import TechnologyResolver from "../resolvers/technology";
import ProjectResolver from "../resolvers/project";

export const createApolloTestServerWithSession = async (userId: number) => {
  return new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, TechnologyResolver, ProjectResolver],
      validate: true,
    }),
    context: () => ({
      req: { session: { userId } },
    }),
  });
};
