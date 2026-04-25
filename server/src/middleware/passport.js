import passport from "passport";
import passportJwt from "passport-jwt";
import config from "../config/config.js";

const cookieExtractor = (req) => {
  if (req && req.cookies) {
    return req.cookies.userJwtToken;
  }
  return null;
};

const JWTStrategy = passportJwt.Strategy;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: config.secret,
    },
    (jwtPayload, done) => {
      if (jwtPayload) {
        return done(null, jwtPayload);
      }
      return done(null, false);
    }
  )
);
