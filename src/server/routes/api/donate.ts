import { Router } from 'express';
import charge from '../../utils/donate';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const donateInfo = req.body;
        const result = await charge(donateInfo.token.id, donateInfo.amount);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

export default router;