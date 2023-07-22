import express, { Request, Response, Application } from "express";
const app: Application = express();
const PORT = process.env.PORT || 8000;

import expressSession from "express-session";
import connectRedis from "connect-redis";
import { createClient } from "redis";
import passport from "passport";
import cors from "cors";
import { routes } from "./src/routes";
require("./src/api/components/auth/passport");

// create a var called domain which takes value from ORIGIN env variable and remove the protocol and the port
const domain = process.env.ORIGIN
  ? process.env.ORIGIN.replace(/(^\w+:|^)\/\//, "").split(":")[0]
  : "";
var whitelist = [
  process.env.FRONTEND_URL,
  process.env.CUSTOMER_URL,
  process.env.ORIGIN,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin as string) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.options(
  "*",
  cors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin as string) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");

  // to be allowed origin is the origin of the request if it is in the whitelist

  const toBeAllowedOrigin = req.headers.origin;

  if (!toBeAllowedOrigin) return next();

  if (whitelist.indexOf(toBeAllowedOrigin) !== -1) {
    res.header("Access-Control-Allow-Origin", toBeAllowedOrigin);
    next();
    return;
  }

  // terminatre the request if the origin is not in the whitelist
  res.sendStatus(401);
});
const redisClient = createClient({ legacyMode: true });
redisClient.connect().catch((err) => {
  throw err;
});

const RedisStore = connectRedis(expressSession);

app.use(
  expressSession({
    store: new RedisStore({ client: redisClient }),

    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      domain: domain,
      // domain: "." + process.env.DOMAIN,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
routes(app);

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
