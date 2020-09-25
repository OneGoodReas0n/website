import { createConnection, Connection } from "typeorm";

export const createTestConnection = async (): Promise<Connection> =>
  createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
    database: "portfolio_test",
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: ["dist/entities/*.js"],
    migrations: ["dist/migrations/*.js"],
  });
