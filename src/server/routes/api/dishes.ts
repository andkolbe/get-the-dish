import * as passport from 'passport';
import db from '../../db';
import { Router } from 'express';
import { upload } from '../../utils/image-upload';

const router = Router();

router.get('/user', passport.authenticate('jwt'), async (req: any, res) => {
    const user = Number(req.user.userid);
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
            const dishes = await db.dishes.all();
            res.json(dishes);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

//@ts-ignore
router.post('/', passport.authenticate('jwt'), upload.single('image'), async (req: any, res) => {
    const dishDTO = req.body;
    dishDTO.image_url = req.file.location;
    dishDTO.userid = req.user.userid // the user who is making the request
    // post a new dish on an individual user on postman by logging in and grabbing a token and attaching that to the post authorization
    try {
        const result = await db.dishes.insert(dishDTO);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.put('/:id', async (req: any, res) => {
    const id = Number(req.params.id);
    const dishDTO = req.body;
    //dishDTO.image_url = req.file.location; req.file only comes from multer. we aren't using multer on a put route
    try {
        const result = await db.dishes.update(id, dishDTO);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await db.dishes.destroy(id);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

export default router;
