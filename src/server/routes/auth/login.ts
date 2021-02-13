import * as passport from 'passport';
import { Router } from 'express';
import { createToken } from '../../utils/tokens';
import { ReqUser } from '../../utils/types';

const router = Router();

router.post('/', passport.authenticate('local') , async (req: ReqUser, res) => {
   
    const token = createToken({ userid: req.user.id });
    res.json(token);

})

export default router;