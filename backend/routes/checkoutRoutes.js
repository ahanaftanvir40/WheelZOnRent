import express from express
import Stripe from stripe

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const router = express.Router()

router.get('/checkout' , async (req,res) =>{

    
})

export default router