import passport from "passport";

// local strategy
import { Strategy as LocalStrategy } from "passport-local";

// user functions
import { createUser, getUser, getUserById, matchPassword } from "./controller";
import { UserInterface } from "./interface";

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: true,
    },
    async (username, password, done) => {
      const user = await getUser(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const match = await matchPassword(password, username);
      if (!match) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});
passport.deserializeUser(async (id: string, done: any) => {
  const user = await getUserById(id);
  return done(null, user);
});
