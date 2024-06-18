import express from "express";
import { auth } from "../middlewares/auth.js";
import { AdminAuth } from "../middlewares/admin-auth.js";
import { User } from "../models/user.models.js";
const router = express.Router()

router.get('/allusers', auth, AdminAuth, async (req, res) => {
    let allUser = await User.find()
    res.json(allUser)
})

export default router