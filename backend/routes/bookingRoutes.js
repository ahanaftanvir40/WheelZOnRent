import express from 'express';
import { Booking } from '../models/booking.model.js';// Assuming your Booking model is in './models/Booking'
import { auth } from '../middlewares/auth.js';
import { User } from '../models/user.models.js';

const router = express.Router();

router.post('/bookings', auth, async (req, res) => {
    const { vehicleId, ownerId, driverId, bookingStart, bookingEnd, totalAmount } = req.body;
    console.log(req.body);
    console.log("USER ID-", req.user.id);
    console.log("NewBooking- ", {
        vehicleId,
        driverId,
        ownerId,
        userId: req.user.id,
        bookingStart,
        bookingEnd,
        status: 'pending',
        totalAmount
    });
    try {
        const newBooking = await Booking.create({
            vehicleId,
            driverId,
            ownerId,
            userId: req.user.id,
            bookingStart,
            bookingEnd,
            status: 'pending',
            totalAmount
        });
        console.log(newBooking);

        await newBooking.save();

        const user = await User.findOne({ _id: req.user.id });
        // console.log("USER-", user);
        // console.log("BOOKING ID", newBooking._id);
        user.bookings.push(newBooking._id);

        await user.save();

        res.json({ success: true, bookingId: newBooking._id });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});



export default router;