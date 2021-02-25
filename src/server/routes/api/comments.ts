import * as passport from 'passport';
import db from '../../db';
import { Router } from 'express';
import { ReqUser } from '../../utils/types';
import { tokenCheck } from '../../middlewares/custom-middlewares';

const router = Router();

router.get('/:id?', async (req, res) => {
    console.log(req.params)
    const id = Number(req.params.id);
    try {
        if (id) {
            const [comment] = await db.comments.one(id);
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

// get all of the comments for a single dish
router.get('/dish/:dishid', async (req, res) => {
    const dishid = Number(req.params.dishid);
    try {
        // don't descructure because we want to see all of the comments for a single dish
        const comment = await db.comments.allForDish(dishid);
        res.json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

// only someone who is logged in should be able to write a comment
router.post('/', tokenCheck, async (req: ReqUser, res) => {
    const commentDTO = req.body;
    commentDTO.userid = Number(req.user.userid)
    try {
        const result = await db.comments.insert(commentDTO);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.put('/:id', tokenCheck, async (req: ReqUser, res) => {
    const id = Number(req.params.id);
    const commentDTO = req.body;
    const userid = Number(req.user.userid)
    try {
        const result = await db.comments.update(id, userid, commentDTO);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.delete('/:id',  tokenCheck, async (req: ReqUser, res) => {
    const id = Number(req.params.id);
    const userid = Number(req.user.userid)
    try {
        const result = await db.comments.destroy(id, userid);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

export default router;