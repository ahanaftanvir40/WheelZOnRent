import express from 'express'
import { User } from '../models/user.models.js'
import bcrypt from 'bcrypt'


const router = express.Router()

router.post('/createuser', async (req, res) => {
    let { name, email, password, drivingLicense, nationalId } = req.body

    try {
        let user = await User.findOne({ email: email })
        if (user) {
            console.log('user already exists');//show this on the frontend
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                await User.create({
                    name,
                    email,
                    password: hash,
                    drivingLicense,
                    nationalId
                })
            })
        })
        res.json({ success: true })
    } catch (error) {
        console.log(error);
        res.json({ success: false })
    }

})


export default router