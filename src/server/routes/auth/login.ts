import * as passport from 'passport';
import { Router } from 'express';


const router = Router();

router.post('/', passport.authenticate('local') , async (req, res) => {
   
    const token = 

})

export default router;
