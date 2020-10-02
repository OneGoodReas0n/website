import { Connection, createConnection, getConnectionOptions } from "typeorm";

export const createORMConnection = async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  const options = { ...connectionOptions, name: "default" };
  return createConnection(options);
};
