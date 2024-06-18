import express from 'express';
import { Booking } from '../models/booking.model.js';// Assuming your Booking model is in './models/Booking'
import { auth } from '../middlewares/auth.js';
import { User } from '../models/user.models.js';

const router = express.Router();

router.post('/bookings', auth, async (req, res) => {
    const { vehicleId, driverId, ownerId, userId, bookingStart, bookingEnd, totalAmount } = req.body;

    try {
        const newBooking = await Booking.create({
            vehicleId,
            driverId,
            ownerId,
            userId,
            bookingStart,
            bookingEnd,
            status: 'pending',
            totalAmount

        });

        await newBooking.save();

        const user = await User.findOne({ _id: userId });
        user.bookings.push(newBooking._id);
        await user.save();

        res.json({ success: true, bookingId: newBooking._id });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

export default router;