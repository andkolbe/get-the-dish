import db from '../../db';
import { welcomeEmail } from '../../utils/mailgun';
import { Router } from 'express';
import { generateHash } from '../../utils/passwords'; // a hashed password is generated when a new user registers
import { createToken } from '../../utils/tokens';
import { upload } from '../../utils/image-upload';
import config from '../../config';

const router = Router();

//@ts-ignore
router.post('/', upload.single('image'), async (req: any, res) => {

    const userDTO = req.body;
    userDTO.password = generateHash(userDTO.password);
    userDTO.avatar_url = req.file.location;

    try {

        const result = await db.users.insert(userDTO);
        const token = createToken({ userid: result.insertId });
        res.json(token);
        await welcomeEmail(userDTO.email, config.email.my_address)
        // await welcomeEmail(config.email.my_address, config.email.my_address)


    } catch (error) {

        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
        
    }
})

export default router;