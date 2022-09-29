import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { User } from "../models/Users.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "No se encontro un usuario." });
      }

      // Match Password's User
      const isMatch = await user.comparePassword(password);
      if (!isMatch)
        return done(null, false, { message: "Contraseña Incorrecta." });
      
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});