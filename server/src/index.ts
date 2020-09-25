import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { __prod__ } from "./consts";
import { createApolloServer } from "./utils/createApolloServer";

const PORT = process.env.PORT;

(async () => {
  const app = express();

  const connection = await createConnection();

  let RedisStore = connectRedis(session);
  let redisClient = new Redis(process.env.REDIS_URL);

  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

  app.use(
    session({
      name: "uid",
      secret: process.env.SECRET,
      store: new RedisStore({ client: redisClient, disableTouch: true }),
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

  const apolloServer = await createApolloServer();

  apolloServer.applyMiddleware({ app });

  app.listen(parseInt(PORT), () => {
    console.log("Server started on localhost:", PORT);
  });
})().catch((err) => {
  console.log(err);
});
