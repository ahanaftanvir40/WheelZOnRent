import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({

    sender: String,
    receiver: String,
    message: String,
    
    

},{timestamps:true})

export const Chat = mongoose.model('chat' , chatSchema)