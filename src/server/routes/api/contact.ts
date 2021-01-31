import sendEmail from '../../utils/contact';
import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const emailInfo = req.body;
        const result = await sendEmail('kolbe1129@gmail.com', emailInfo.email, emailInfo.subject, emailInfo.content)
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

export default router;