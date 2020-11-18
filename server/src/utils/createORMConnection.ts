import path from "path";
import { Connection, createConnection } from "typeorm";
import { __prod__ } from "../consts";
import Picture from "../entities/Picture";
import Project from "../entities/Project";
import Technology from "../entities/Technology";
import User from "../entities/User";
import ProjectLink from "../entities/ProjectLink";

export const createORMConnection = async (): Promise<Connection> => {
  const mode = process.env.NODE_ENV;
  return createConnection({
    type: "postgres",
    url:
      mode === "test"
        ? process.env.TEST_DATABASE_URL
        : __prod__
        ? process.env.DATABASE_URL
        : process.env.DEV_DATABASE_URL,
    logging: mode !== "test",
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    migrationsRun: mode === "test",
    dropSchema: mode === "test",
    entities: [User, Project, Picture, Technology, ProjectLink],
  });
};
