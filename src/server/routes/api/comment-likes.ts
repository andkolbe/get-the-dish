import db from '../../db';
import { Router } from 'express';
import { tokenCheck } from '../../middlewares/custom-middlewares';
import { ReqUser } from '../../utils/types';

const router = Router();

router.get('/:commentid', async (req, res) => {
    const commentid = Number(req.params.commentid);
    try {
        const commentLike = await db.commentLikes.getWhoLikes(commentid);
        res.json(commentLike);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.post('/:commentid', tokenCheck, async (req: ReqUser, res) => {
    const commentid = Number(req.params.commentid);
    const userid = Number(req.user.userid);
    try {
        const result = await db.commentLikes.insert(commentid, userid);
        res.json({ msg: 'comment like added', affectedRows: result.affectedRows});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.delete('/:commentid', tokenCheck, async (req: ReqUser, res) => {
    const commentid = Number(req.params.commentid);
    const userid = Number(req.user.userid); // we need to make sure only the user who is logged in can delete their likes
    try {
        const result = await db.commentLikes.destroy(commentid, userid);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

export default router;