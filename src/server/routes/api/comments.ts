import { Router } from 'express';
import db from '../../db';

const router = Router();

router.get('/:id?', async (req, res) => {
    const id = Number(req.params.id);
    try {
        if (id) {
            const comment = await db.comments.allForDish(id);
            res.json(comment);
        } else {
            const comments = await db.comments.all();
            res.json(comments);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.post('/', async (req, res) => {
    const commentDTO = req.body;
    try {
        const result = await db.comments.insert(commentDTO);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const commentDTO = req.body;
    try {
        const result = await db.comments.update(id, commentDTO);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await db.comments.destroy(id);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

export default router;