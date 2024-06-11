import express from 'express'
import { auth } from '../middlewares/auth.js'
import { Vehicle } from '../models/vehicle.models.js';

const router = express.Router()

router.post('/vehicles', auth, async (req, res) => {

    const {
        type,
        brand,
        model,
        year,
        pricePerDay,
        location,
        availability,
        images,
        category,
        condition,
        no_plate,
        chassis_no,
        registration_no,
    } = req.body;

    try {
        const vehicle = await Vehicle.create({
            ownerId: req.user.id,
            type,
            brand,
            model,
            year,
            pricePerDay,
            location,
            availability,
            images,
            category,
            condition,
            no_plate,
            chassis_no,
            registration_no,
        })
        await vehicle.save()
        res.json({ success: true })
    } catch (error) {
        console.log(error);
        res.json({ success: false })
    }

})

export default router