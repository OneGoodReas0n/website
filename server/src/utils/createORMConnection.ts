import {
  createConnection,
  Connection,
  getConnectionOptions,
  getConnection,
} from "typeorm";

export const createORMConnection = async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  const options = { ...connectionOptions, name: "default" };
  return createConnection(options);
};

export const closeConnection = async (): Promise<void> => {
  const conn = getConnection();
  if (conn) {
    await conn.close();
  }
};
