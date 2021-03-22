import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import * as JWTStrategy from 'passport-jwt';
import db from '../db';
import config from '../config';
import { bcrypt_validate, validate, generateHash } from '../utils/passwords';
import { IPayload } from '../utils/types';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy.Strategy({
    usernameField: 'email'
}, async (email, password, done) => {

    try {
        const [user] = await db.users.find('email', email);
        // if (user && bcrypt_validate(password, user.password)) {
        //     delete user.password
        //     done(null, user);
        // } else {
        //     done(null, false);
        // }

        if (user) {
            if (user.password.startsWith('$2b')) {
                // if hashed with bcrypt
                if (await bcrypt_validate(password, user.password)) {
                    const argon2Hash = await generateHash(password);
                    await db.users.update(user.id, { password: argon2Hash });
                    delete user.password
                    done(null, user);
                } else {
                    done(null, false);
                }
            } else {
                // if hashed with something else
                if (await validate(password, user.password)) {
                    delete user.password
                    done(null, user);
                } else {
                    done(null, false)
                }
            }
        } else {
            done(null, false)
        }
    } catch (error) {
        console.log(error);
        done(error);
    }

    

}));

passport.use(new JWTStrategy.Strategy({
    jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.secret
}, (payload: IPayload, done) => {
    done(null, payload);
}))