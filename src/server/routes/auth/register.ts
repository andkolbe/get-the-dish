import db from '../../db';
import { Router } from 'express';
import { generateHash } from '../../utils/passwords'; // a hashed password is generated when a new user registers
import { createToken } from '../../utils/tokens';


const router = Router();

router.post('/', async (req, res) => {

    const userDTO = req.body;
    userDTO.password = generateHash(userDTO.password);

    try {

        const result = await db.users.insert(userDTO);
        const token = createToken({ userid:  result.insertId });
        res.json(token);

    } catch (error) {

        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
        
    }
})

export default router;