import { Router } from 'express';
import * as crypto from 'crypto';
import db from '../../db';
import config from '../../config';
import { contactEmail } from '../../utils/mailgun';
import { tokenCheck } from '../../middlewares/custom-middlewares';
import { generateHash } from '../../utils/passwords';

const router = Router();

// router.get('/reset-password', async (req, res) => { 
//     // Get id off reset token based on query params? 
//     const token = req.query.token; 
//     const email = req.query.email;

//     try {
//         // destroy all old expired tokens to be safe and to clean up the table in the db
//         // if the current token we are trying to find is expired, it will be deleted and not pass the next test
//         await db.resetToken.destroyToken();

//         // find and confirm the reset token
//         const emailCheck = await db.resetToken.findToken('email', email);
//         const resetTokenCheck = await db.resetToken.findToken('token', token);


//         // if the information doesn't match, reroute and show a message on home page 
//         if (emailCheck === null || resetTokenCheck === null) {
//              res.status(500).json({ msg: 'Token is invalid. Please try password reset again' })

//              // on front end: if status === 500 reroute to home page and send alert that reads 'Token has expired. Please try password reset again'
//         }

//         // otherwise, route them to the reset password route
//         res.json();

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ msg: 'my code sucks', error: error.message })
//     }

// });

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
        // also find user id 
        // foreign key the user id to the reset token table. find the user id by looking up the email that was inputted
        const emailLookup = await db.users.find('email', email);
        const userId = await db.users.selectIdByEmail(email);

        // we don't want to tell attackers that an email doesn't exist, because that will let them use this form to find ones that do
        // 401 user doesnt have that email address
        if (emailLookup === null) res.status(200);

        // set the value of used to 1 for any reset tokens the were previously created for a user. That prevents old tokens from being used
        await db.resetToken.updateToken(email);

        // create a random reset token attached to the email link that expires after one hour
        const randomHash = crypto.randomBytes(12).toString('hex');
        console.log(randomHash);

        // sets the token to expire in one hour
        let expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 1);

        // insert new token into reset_token table
        // store user id so we can use it later to update users table
        await db.resetToken.createToken(userId, email, expireDate, randomHash, 0);

        // create and send email
        // add token and email as query params

        // FROM EMAIL no_reply@getthedish.com
        // can set content with html markup instead of plain text
        // hide domain behind env
        // use inlinecss to turn content into Link
        await contactEmail(email, config.email.my_address, 'Forgot Password Reset', `To reset your password, please click the link below. \n\n${config.host}/reset?token=${randomHash}&email=${email}`)
        // localhost will be replaced by the domain name. hide domain name behind .env?

        res.json({ msg: 'reset token sent!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

// router.put('/reset-password', async (req, res) => {
//     const tokenDTO = req.body;
//     tokenDTO.password = generateHash(tokenDTO.password);
//     try {
//         // also need to update password in users table. Should it be a foreign key?
//         const result = await db.resetToken.updateToken(tokenDTO.email);
//         res.json(result);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ msg: 'my code sucks', error: error.message })
//     }
// })

router.put('/confirm-reset', async (req, res) => {
    const userDTO = req.body;
    try {
        // validate the reset token
        const [validated] = await db.resetToken.validateToken(userDTO.resetToken, userDTO.userEmail);
        res.json(validated);

        // if the validated token hasn't been used already
        if (validated?.used === 0) {
            // salt and hash new password
            userDTO.password = generateHash(userDTO.password);

            // update users record in db with new token via email


            // now that we have the userid off of the reset_token table, update the users table email where id = ?

            // const result = await db.users.update(id, userDTO);



            // update reset_token table used value to 2
            // call it update2 or something
            // 0 unused
            // 1 expired
            // 2 successfully reset
        } else {
            throw new Error('reset failed');
        }


        // also need to update used value in reset_token table to 1
        // const result = await db.resetToken.updateToken(tokenDTO.email);
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
