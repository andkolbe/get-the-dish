import { Router } from 'express';
import Stripe from 'stripe';
import config from '../../config';

const stripe = new Stripe(config.keys.stripe, { apiVersion: '2020-08-27' })

const router = Router();

router.post('/', async (req, res) => {
    const { amount, paymentMethod } = req.body;
    try {
        const result = await stripe.paymentIntents.create({
            currency: 'usd',
            amount: amount * 100,
            payment_method: paymentMethod.id,
            confirm: true
        })
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

export default router;