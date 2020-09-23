import "reflect-metadata";
import "dotenv-safe/config";
import path from "path";
import express from "express";
import cors from "cors";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { createConnection } from "typeorm";

import { __prod__ } from "./consts";

const PORT = process.env.PORT;

(async () => {
  const app = express();

  const connection = await createConnection({
    type: "postgres",
    url: process.env.DATBASE_URL,
    logging: true,
    entities: [],
    migrations: [path.join(__dirname, "./migrations/*")],
  });

  let RedisStore = connectRedis(session);
  let redisClient = new Redis(process.env.REDIS_URL);

  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

  app.use(
    session({
      name: "uid",
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      secret: process.env.SECRET,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
        httpOnly: true,
        secure: __prod__, //cookie only works in http
        sameSite: "lax",
        domain: __prod__ ? "http://localhost:3000" : "",
      },
      saveUninitialized: false,
      resave: false,
    })
  );

  app.listen(parseInt(PORT), () => {
    console.log("Server started on localhost:", PORT);
  });
})();
