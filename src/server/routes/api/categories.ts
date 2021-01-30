import { Router } from 'express';
import db from '../../db';

const router = Router();


router.get('/', async (req, res) => {
    try {
        const categories = await db.categories.all();
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.post('/', async (req, res) => {
    const categoryDTO = req.body;
    try {
        const result = await db.categories.insert(categoryDTO);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await db.categories.destroy(id);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

export default router;