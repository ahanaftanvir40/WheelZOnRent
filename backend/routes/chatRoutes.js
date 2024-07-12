import express from 'express'
import { Chat } from '../models/chat.model.js'
const router = express.Router()

router.get('/ownerChat/:ownerId' , async (req , res)=>{

    
    const receiverId = req.params.ownerId
    const AllOwnerChat = await Chat.find({receiver:receiverId})

    res.json({AllOwnerChat})

})

export default router