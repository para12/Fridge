import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const jwtOptions = {
  // header에 bearer스키마에 담겨온 토큰 해석할 것
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // 해당 복호화 방법사용
  secretOrKey: process.env.JWT_SECRET,
  // secretOrKey: "secret",
};

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user.findOne({ where: { id: payload.id } });
    // user가 있을 경우
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

export const authenticateJWT = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new JwtStrategy(jwtOptions, verifyUser));
passport.initialize();

export const isAuthenticated = (req) => {
  if (!req.user) {
    throw Error("You need to log in");
  }
  return;
};
