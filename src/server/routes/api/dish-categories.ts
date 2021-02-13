import * as passport from 'passport';
import db from '../../db';
import { Router } from 'express';


const router = Router();

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const dishCategories = await db.dishCategories.oneDishCategory(id);
        res.json(dishCategories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.post('/', passport.authenticate('jwt'), async (req, res) => {
    const { dishid, categoryid } = req.body;
    try {
        await db.dishCategories.insert(dishid, categoryid);
        res.json({ msg: 'dish category added'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.put('/:id', passport.authenticate('jwt'), async (req, res) => {
    const dishid = Number(req.params.id);
    const { newCategoryid, oldCategoryid } = req.body;
    try {
        await db.dishCategories.update(newCategoryid, oldCategoryid, dishid);
        res.json({ msg: 'dish category changed'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

router.delete('/:id', passport.authenticate('jwt'), async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await db.dishCategories.destroy(id);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

export default router;
