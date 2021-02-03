import * as passport from 'passport';
import db from '../../db';
import { Router } from 'express';
import { upload } from '../../utils/image-upload';

const router = Router();

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
router.post('/', upload.single('image'), async (req: any, res) => {
    const dishDTO = req.body;
    dishDTO.image_url = req.file.location;
    dishDTO.userid = 1;
    //dishDTO.userid = req.user.userid // who is making the request
    try {
        const result = await db.dishes.insert(dishDTO);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.put('/:id', passport.authenticate('jwt'), async (req: any, res) => {
    const id = Number(req.params.id);
    const dishDTO = req.body;
    dishDTO.image_url = req.file.location;
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