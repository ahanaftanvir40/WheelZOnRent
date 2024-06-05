import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

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
    drivingLicense: { 
        type: String 
    },
    nationalId: { 
        type: String 
    }


}, { timestamps: true })

export const User = mongoose.model('user', userSchema)