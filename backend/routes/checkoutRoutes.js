import express from 'express'
import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const router = express.Router()

router.post('/checkout', async (req, res) => {

    const { amount } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'bdt',
                    product_data: {
                        name: 'Car Rental Booking',
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
})

export default router