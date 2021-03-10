import { Router } from 'express';
import * as crypto from 'crypto';
import db from '../../db';
import config from '../../config';
import { contactEmail } from '../../utils/mailgun';
import { tokenCheck } from '../../middlewares/custom-middlewares';
import { generateHash } from '../../utils/passwords';

const router = Router();

router.get('/reset-password', async (req, res) => { 
    // Get id off reset token based on query params? 
    const token = req.query.token; 
    const email = req.query.email;
    
    try {
        // destroy all old expired tokens to be safe and to clean up the table in the db
        // if the current token we are trying to find is expired, it will be deleted and not pass the next test
        await db.resetToken.destroyToken();

        // find and confirm the reset token
        const emailCheck = await db.resetToken.findToken('email', email);
        const resetTokenCheck = await db.resetToken.findToken('token', token);
     

        // if the information doesn't match, reroute and show a message on home page 
        if (emailCheck === null || resetTokenCheck === null) {
             res.status(500).json({ msg: 'Token is invalid. Please try password reset again' })

             // on front end: if status === 500 reroute to home page and send alert that reads 'Token has expired. Please try password reset again'
        }

        // otherwise, route them to the reset password route
        res.json({ msg: 'redirected to reset password form' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }

});

router.get('/profile', tokenCheck, async (req: any, res) => {
    // get one user by their userid on their payload provided by the req.user from passport
    const userid = req.user.userid;
    try {
        const [profileInfo] = await db.users.one(userid);
        delete profileInfo.password
        res.json(profileInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.get('/:id?', async (req, res) => {
    const id = Number(req.params.id);
    try {
        if (id) {
            const [user] = await db.users.one(id);
            res.json(user);
        } else {
            const users = await db.users.all();
            res.json(users);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})




router.post('/forgot-password', async (req, res) => {
    const userDTO = req.body;
    const email = userDTO.email;
    try {
        // ensure that you have a user with that email
        const emailLookup = await db.users.find('email', email);

        // we don't want to tell attackers that an email doesn't exist, because that will let them use this form to find ones that do
        if (emailLookup === null) res.status(200);

        // set the value of used to 1 for any reset tokens the were previously created for a user. That prevents old tokens from being used
        // LOOK AT THIS AGAIN
        await db.resetToken.updateToken(email);

        // create a random reset token attached to the email link that expires after one hour
        const randomHash = crypto.randomBytes(12).toString('hex');
        console.log(randomHash);

        // sets the token to expire in one hour
        let expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 1);

        // initialize used with a value of 0
        const used = 0;

        // insert new token into reset_token table
        const resetToken = await db.resetToken.createToken(email, expireDate, randomHash, used);

        // create and send email
        // add token and email as query params
        await contactEmail(email, config.email.my_address, 'Forgot Password Reset', `To reset your password, please click the link below. \n\nlocalhost:3000/reset?token=${randomHash}&email=${email}`)
        // localhost will be replaced by the domain name. hide domain name behind .env?

        res.json(resetToken);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.put('/reset-password', async (req, res) => {
    const tokenDTO = req.body;
    tokenDTO.password = generateHash(tokenDTO.password);
    try {
        // also need to update password in users table. Should it be a foreign key?
        const result = await db.resetToken.updateToken(tokenDTO.email);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const userDTO = req.body;
    try {
        const result = await db.users.update(id, userDTO);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await db.users.destroy(id);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

export default router;
