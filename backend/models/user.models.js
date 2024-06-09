import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    avatar: {
        type: String,
        default: 'default.jpg'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    drivingLicense: {
        type: String,
        required: true
    },
    licenseFile: {
        type: String
    },
    nationalId: {
        type: String,
        required: true
    }



}, { timestamps: true })

export const User = mongoose.model('user', userSchema)