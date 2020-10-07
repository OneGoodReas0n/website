import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { __prod__, COOKIE_NAME } from "./consts";
import { createApolloServer } from "./utils/createApolloServer";
import { createORMConnection } from "./utils/createORMConnection";

const PORT = process.env.PORT;

(async () => {
  const app = express();

  await createORMConnection();

  let RedisStore = connectRedis(session);
  let redisClient = new Redis(process.env.REDIS_URL);

  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

  app.use(
    session({
      name: COOKIE_NAME,
      secret: process.env.SECRET,
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
        domain: __prod__ ? "http://localhost:3000" : "",
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
