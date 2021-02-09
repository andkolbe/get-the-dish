import db from '../../db';
import { Router } from 'express';

const router = Router();

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const dishLike = await db.dishLikes.oneDishLike(id);
        res.json(dishLike);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.post('/', async (req, res) => {
    const { dishid, userid } = req.body;
    try {
        await db.dishLikes.insert(dishid, userid);
        res.json({ msg: 'dish like added'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const dishLikeDTO = req.body;
    try {
        await db.dishLikes.update(dishLikeDTO.newid, dishLikeDTO.oldid, id);
        res.json({ msg: 'dish like changed'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await db.dishLikes.destroy(id);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

export default router;