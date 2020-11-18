import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import "reflect-metadata";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { COOKIE_NAME, __prod__ } from "./consts";
import { createApolloServer } from "./utils/createApolloServer";
import { createORMConnection } from "./utils/createORMConnection";

const PORT = process.env.PORT;

(async () => {
  const app = express();
  await createORMConnection();

  let RedisStore = connectRedis(session);
  let redisClient = new Redis(
    __prod__ ? process.env.REDIS_URL : process.env.DEV_REDIS_URL
  );

  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: __prod__ ? process.env.CORS_ORIGIN : "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      secret: process.env.SECRET,
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        domain: __prod__ ? process.env.DOMAIN : "",
      },
      saveUninitialized: false,
      resave: false,
    })
  );

  const apolloServer = await createApolloServer();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(parseInt(PORT), () => {
    console.log("Server started on localhost:", PORT);
  });
})().catch((err) => {
  console.log(err);
});
