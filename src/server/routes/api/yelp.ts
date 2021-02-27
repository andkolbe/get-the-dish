import { Router } from 'express';
import { search } from '../../utils/yelp';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const yelpData = req.body;
        const [result] = await search(yelpData.term, yelpData.location)
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'you done goofed', error })
    }
})

export default router;