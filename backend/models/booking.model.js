import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookingStart: {
        type: Date,
        required: true
    },
    bookingEnd: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'inUse', 'returned'],
        default: 'pending'
    },
    totalAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true });


export const Booking = mongoose.model('booking', bookingSchema)