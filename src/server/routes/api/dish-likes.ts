import db from '../../db';
import { Router } from 'express';

const router = Router();

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const commentLikes = await db.commentLikes.oneCommentLike(id);
        res.json(commentLikes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.post('/', async (req, res) => {
    const { commentid, userid } = req.body;
    try {
        await db.commentLikes.insert(commentid, userid);
        res.json({ msg: 'comment like added'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const commentLikeDTO = req.body;
    try {
        await db.commentLikes.update(commentLikeDTO.newid, commentLikeDTO.oldid, id);
        res.json({ msg: 'comment like changed'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await db.commentLikes.destroy(id);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

export default router;