import { Router } from 'express';
import * as crypto from 'crypto';
import db from '../../db';
import config from '../../config';
import { contactEmail } from '../../utils/mailgun';
import { tokenCheck } from '../../middlewares/custom-middlewares';
import { generateHash } from '../../utils/passwords';

const router = Router();

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
        // this will give you all the information off of the row with that email
        const [userRecord] = await db.users.find('email', email);

        // // also find user id 
        // // foreign key the user id to the reset token table. find the user id by looking up the email that was inputted
        // await db.users.selectIdByEmail(email);

        // we don't want to tell attackers that an email doesn't exist, because that will let them use this form to find ones that do
        // 401 user doesnt have that email address
        if (userRecord === null || userRecord === undefined) return res.sendStatus(200);

        // set the value of used to 1 for any reset tokens the were previously created for a user. That prevents old tokens from being used
        await db.resetToken.updateTokenExpired(email);

        // create a random reset token attached to the email link that expires after one hour
        const randomHash = crypto.randomBytes(12).toString('hex');
        console.log(randomHash);

        // sets the token to expire in one hour
        let expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 1);

        // insert new token into reset_token table
        // store user id so we can use it later to update users table
        console.log(userRecord);
        await db.resetToken.createToken(userRecord.id, email, expireDate, randomHash, 0);

        // create and send email
        // add token and email as query params

        // can set content with html markup instead of plain text
        // use inlinecss to turn content into Link
        await contactEmail(email, 'no_reply@getthedish.com', 'Forgot Password Reset', `To reset your password, please click the link below. \n\nlocalhost:3000/reset?token=${randomHash}&email=${email}`)

        res.json({ msg: 'reset token sent!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.put('/confirm-reset', async (req, res) => {
    const userDTO = req.body;
    try {
        // validate the reset token
        const [validated] = await db.resetToken.validateToken(userDTO.resetToken, userDTO.userEmail);
        console.log(validated);

        // if the validated token hasn't been used already
        if (validated?.used === 0) {
            // salt and hash new password
            userDTO.password = generateHash(userDTO.password);

            // destroy all old expired tokens to be safe and to clean up the table in the db
            // if the current token we are trying to find is expired, it will be deleted and not pass the next test
            await db.resetToken.destroyToken();

            // update users record in db with new token via email

            // now that we have the userid off of the reset_token table, update the users table email where id = ?

            // const result = await db.users.update(id, userDTO);

            // update reset_token table used value to 2
            await db.resetToken.updateTokenSuccessful(userDTO.email, userDTO.resetToken);
            
            // 0 unused
            // 1 expired
            // 2 successfully reset

            await db.users.update(validated.user_id, { password: userDTO.password })
            res.json({ msg: 'omg'})

        } else {
            throw new Error('reset failed');
        }
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
