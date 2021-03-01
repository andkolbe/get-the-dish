import { Router } from 'express';
import { autocomplete, search } from '../../utils/yelp';

const router = Router();

router.post('/auto', async (req, res) => {
    try {
        const yelpData = req.body;
        const result = await autocomplete(yelpData.text)
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'you done goofed', error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const yelpData = req.body;
        const result = await search(yelpData.term, yelpData.location)
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'you done goofed', error: error.message })
    }
})

export default router;