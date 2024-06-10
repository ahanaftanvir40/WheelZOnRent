import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    id: {
        autoIncrement: true,
        required: true
    },
    brand: {
        type: String,
        default: 'default.jpg'
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    no_plate: {
        type: String,
        required: true
    },
    chassis_no: {
        type: String,
        required: true
    },
    registration_no: {
        type: String,
        required: true
    }



}, { timestamps: true })

export const User = mongoose.model('vehicle', userSchema)