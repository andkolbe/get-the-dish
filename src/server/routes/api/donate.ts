import { Router } from 'express';


const router = Router();

router.get('/', async (req, res) => {
    try {
        res.json('TEST donate');
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

export default router;