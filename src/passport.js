import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
// import "./env";

const jwtOptions = {
  // header에 bearer스키마에 담겨온 토큰 해석할 것
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // 해당 복호화 방법사용
  // secretOrKey: process.env.JWT_SECERT,
  secretOrKey: "secret",
};

const verifyUser = async (payload, done) => {
  console.log("payload", payload);
  try {
    const user = await prisma.user({ id: payload.id });
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

export const authenticateJWt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    // console.log(user);
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new JwtStrategy(jwtOptions, verifyUser));
passport.initialize();
