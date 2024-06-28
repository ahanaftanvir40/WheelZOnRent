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

        const user = await User.findOne({ _id: req.user._id });
        user.bookings.push(newBooking._id);
        await user.save();

        res.json({ success: true, bookingId: newBooking._id });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

router.get('/bookings/pending', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ ownerId: req.user.id, status: { $in: ['pending', 'approved'] } }).populate('vehicleId userId')
        console.log(bookings);
        res.json(bookings)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/bookings/:id/approve', async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).send('Booking not found');
        }

        booking.status = 'approved';
        await booking.save();
        res.status(200).send('Booking approved');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;