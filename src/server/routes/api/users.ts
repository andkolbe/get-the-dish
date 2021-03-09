import { Router } from 'express';
import * as crypto from 'crypto';
import db from '../../db';
import config from '../../config';
import { contactEmail } from '../../utils/mailgun';
import { tokenCheck } from '../../middlewares/custom-middlewares';

const router = Router();



router.get('/forgot-password', function (req, res) {
    res.render('user/forgot-password', {});
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
        if (emailLookup === null) res.status(200).json({ status: 'ok' });

        // expire any reset tokens the were previously created for a user. That prevents old tokens from being used
        await db.users.updateToken(userDTO.used, userDTO.updated_at, email)

        // create a random reset token attached to the email link that expires after one hour
        const randomHash = crypto.randomBytes(12).toString('hex');
        console.log(randomHash);

        let expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 1); 
        // sets the token to expire in one hour
        // setDate Sets the day of the month for a specified date according to local time
        // getDate Returns the day of the month (1–31) for the specified date according to local time

        // insert new token into DB
        await db.users.createToken(email, expireDate, randomHash, 0);

        // create and send email. Link needs to send a token to client. PUT req.body.email
        // link needs to add token to the end of the url bar
        await contactEmail(email, config.email.my_address, 'Forgot Password Reset', `To reset your password, please click the link below. \n\nlocalhost:3000/reset/${randomHash}`)
        // localhost will be replaced by the domain name. hide domain name behind .env?
        res.json({ msg: 'message sent!' })
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
