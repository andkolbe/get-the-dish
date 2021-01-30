import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import * as JWTStrategy from 'passport-jwt';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

