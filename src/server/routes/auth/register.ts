import db from '../../db';
import { welcomeEmail } from '../../utils/mailgun';
import { Router } from 'express';
import { generateHash } from '../../utils/passwords'; // a hashed password is generated when a new user registers
import { createToken } from '../../utils/tokens';
import { upload } from '../../utils/image-upload';

const router = Router();

//@ts-ignore
router.post('/', upload.single('image'), async (req: any, res) => {

    // this wont work if an image isnt selected

    const userDTO = req.body;
    userDTO.password = generateHash(userDTO.password);
    userDTO.avatar_url = req.file.location;

    try {

        const result = await db.users.insert(userDTO);
        // await welcomeEmail(userDTO.email, 'Andrew <kolbe1129@gmail.com>')
        await welcomeEmail('kolbe1129@gmail.com', 'Andrew <kolbe1129@gmail.com>')
        const token = createToken({ userid:  result.insertId });
        res.json(token);


    } catch (error) {

        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
        
    }
})

export default router;