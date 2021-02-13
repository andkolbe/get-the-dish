import db from '../../db';
import { Router } from 'express';
import { generateHash } from '../../utils/passwords'; // a hashed password is generated when a new user registers
import { createToken } from '../../utils/tokens';
import { upload } from '../../utils/image-upload';

const router = Router();

//@ts-ignore
router.post('/', upload.single('image'), async (req: any, res) => {

    const userDTO = req.body;
    userDTO.password = generateHash(userDTO.password);
    userDTO.avatar_url = req.file.location;

    try {

        const result = await db.users.insert(userDTO);
        const token = createToken({ userid:  result.insertId });
        // await mailgun.sendWelcome(newUser) send a welcome message to the email they signed up with. maybe create a click link verify email form
        res.json(token);

    } catch (error) {

        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
        
    }
})

export default router;