import db from '../../db';
import { Router } from 'express';
import { upload } from '../../utils/image-upload';
import { ReqUser } from '../../utils/types';
import { tokenCheck } from '../../middlewares/custom-middlewares';

const router = Router();

router.get('/search', async (req: ReqUser, res) => {
    const term = req.query.term; // query is coded on the Request object same as params or body
    try {
        const dishes = await db.dishes.search(term.toString()); // we don't want this to be a Query type so we hard code it to a string
        res.json(dishes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

// get all of the dishes that one user has posted off of the userid on the req.user from postman
router.get('/user', tokenCheck, async (req: ReqUser, res) => {
    const user = Number(req.user.userid); // this is accessable anywhere you put passport jst
    try {
        const dishes = await db.dishes.forUser(user);
        res.json(dishes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.get('/:id?', async (req, res) => {
    const id = Number(req.params.id);
    try {
        if (id) {
            const [dish] = await db.dishes.one(id);
            res.json(dish);
        } else {
            const [dishes] = await db.dishes.all();
            res.json(dishes);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})


//@ts-ignore
router.post('/', tokenCheck, upload.single('image'), async (req: any, res) => {
    const dishDTO = req.body;
    dishDTO.image_url = req.file.location;
    dishDTO.userid = Number(req.user.userid) // the user who is making the request
    // post a new dish on an individual user on postman by logging in and grabbing a token and attaching that to the post authorization
    try {
        const result = await db.dishes.insert(dishDTO);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.put('/:id', tokenCheck, async (req: ReqUser, res) => {
    const id = Number(req.params.id);
    const dishDTO = req.body;
    // only the user who is logged in can edit their own posts
    // we're already protected from this on the front end, this is just extra protection for the back
    const userid = Number(req.user.userid);
    try {
        const result = await db.dishes.update(id, userid, dishDTO);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.delete('/:id', tokenCheck, async (req: ReqUser, res) => {
    const id = Number(req.params.id);
    // only the user who is logged in can delete their own posts
    const userid = Number(req.user.userid);
    try {
        const result = await db.dishes.destroy(id, userid);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

export default router;
