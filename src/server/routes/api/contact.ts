import { contactEmail } from '../../utils/mailgun';
import { Router } from 'express';
import config from '../../config';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const emailInfo = req.body;
        const result = await contactEmail(config.email.my_address, emailInfo.email, emailInfo.subject, emailInfo.content)
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

export default router;