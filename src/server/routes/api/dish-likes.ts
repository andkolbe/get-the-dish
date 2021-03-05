import db from '../../db';
import { Router } from 'express';
import { tokenCheck } from '../../middlewares/custom-middlewares';
import { ReqUser } from '../../utils/types';

const router = Router();

router.get('/:dishid', async (req, res) => {
    const dishid = Number(req.params.dishid);
    try {
        const whoLiked = await db.dishLikes.getWhoLikes(dishid);
        res.json(whoLiked);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.post('/:dishid', tokenCheck, async (req: ReqUser, res) => {
    const dishid = Number(req.params.dishid);
    const userid = Number(req.user.userid);
    try {
        const result = await db.dishLikes.insert(dishid, userid);
        res.json({ msg: 'dish like added', affectedRows: result.affectedRows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.delete('/:dishid', tokenCheck, async (req: ReqUser, res) => {
    const dishid = Number(req.params.dishid);
    const userid = Number(req.user.userid); // we need to make sure only the user who is logged in can delete their likes
    try {
        const result = await db.dishLikes.destroy(dishid, userid);
        res.json({ msg: 'dish like destroyed', affectedRows: result.affectedRows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

export default router;