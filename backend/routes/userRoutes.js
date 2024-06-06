import express from 'express'
import { User } from '../models/user.models.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const router = express.Router()

router.post('/createuser', async (req, res) => {
    let { name, email, password, drivingLicense, nationalId } = req.body

    try {
        let user = await User.findOne({ email: email })
        if (user) {
            res.json({ success: false });
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

router.post('/loginuser', async (req, res) => {
    let { email, password } = req.body
    try {
        let userData = await User.findOne({ email: email })
        if (!userData) {
            res.json({ success: false })
        }
        if (userData) {
            bcrypt.compare(password, userData.password, function (err, result) {
                if (result) {
                    let authToken = jwt.sign({ id: userData.id }, process.env.JWT_SECRET)
                    res.json({ success: true, authToken: authToken })

                } else {
                    res.json({ success: false })
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
})


export default router