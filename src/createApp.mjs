import express from "express";
import rootRoute from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import "./strategies/local-strategies.mjs";
import { config } from "dotenv";
config({ path: ".env.local" });

export function createApp() {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(
    session({
      secret: process.env.HASHING_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000 * 60,
        sameSite: "none",
      },
      store: MongoStore.create({ client: mongoose.connection.getClient() }),
    })
  );
  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:5174", "https://devplatformsca.netlify.app"],
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(rootRoute);

  app.get("/", (req, res) => {
    req.session.visited = true;

    req.sessionStore.get(req.session.id, (err, sessionData) => {
      if (err) {
        console.log(err);
        throw err;
      }

      console.log("Coming from the session data>>> ", sessionData);
    });

    res.send("hello ");
  });

  app.get("/api/auth/status", (req, res) => {
    return req.user
      ? res.status(200).send(req.user)
      : res.status(401).send({ msg: "Not Authenticated" });
  });

  app.post("/api/auth", passport.authenticate("local"), (req, res) => {
    res.sendStatus(200);
  });

  app.get("/api/auth/discord", passport.authenticate("discord"));

  app.get(
    "/api/auth/discord/redirect",
    passport.authenticate("discord"),
    (req, res) => {
      console.log(req.session);
      console.log(req.user);
      res.status(200).send("Successfully authenticated with discord");
    }
  );
  return app;
}
