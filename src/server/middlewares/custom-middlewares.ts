import * as passport from 'passport';
import { RequestHandler } from 'express'; // you can use RequestHandler to strong type the function itself instead of every parameter

export const tokenCheck: RequestHandler = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => { // provide a callback to the authenticate function

        if (info?.message === 'No auth token') { // use the info object for all error handling in this case
            return res.status(401).json({ msg: 'no token' })
        }

        if (info?.message === 'invalid signature') {
            return res.status(401).json({ msg: 'invalid token' })
        }

        if (info?.message === 'jwt expired') {
            return res.status(401).json({ msg: 'expired token ' })
        }

        if (user) { // we need to serialize the user on our custom middleware
            req.user = user; // if there is a user, we want to serialize it with req.user
        }

        next(); // we must call next or this will crash on us

    })(req, res, next); // IIFE. passport.authenticate must be immediately invoked with its function expressions
}