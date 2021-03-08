import { Router } from 'express';
import db from '../../db';
import { contactEmail } from '../../utils/mailgun';
import { tokenCheck } from '../../middlewares/custom-middlewares';

const router = Router();

router.get('/forgot-password', function(req, res) {
    res.render('user/forgot-password', { });
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
    const userDTO = req.body
    const email = userDTO.email;
    // ensure that you have a user with an email
    const emailLookup = await db.users.find('email', email);

    // we don't want to tell attackers that an email doesn't exist, because that will let them use this form to find ones that do
    if (email == null) res.json({status: 'ok'});

    // create a random reset token that expires after one hour
        // create another jwt that expires in one hour

    // insert token data into reset tokens table in DB

    // create and send email
    await contactEmail(email, 'Andrew <kolbe1129@gmail.com>', 'Forgot Password Reset', `To reset your password, please click the link below `)
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
