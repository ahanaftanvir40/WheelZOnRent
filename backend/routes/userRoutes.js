import express from 'express'
import { User } from '../models/user.models.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { upload } from '../config/multer-config.js'
import { auth } from '../middlewares/auth.js'


const router = express.Router()

router.post('/createuser', upload.fields([{ name: 'avatar' }, { name: 'licenseFile' }]), async (req, res) => {
    let { name, email, password, drivingLicense, nationalId } = req.body
    const avatar = req.files['avatar'] ? req.files['avatar'][0].filename : 'default.jpg'
    const licenseFile = req.files['licenseFile'][0].filename
    try {
        let user = await User.findOne({ email: email })
        if (user) {
            res.json({ success: false });
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                await User.create({
                    avatar,
                    name,
                    email,
                    password: hash,
                    licenseFile,
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
                    let authToken = jwt.sign({ id: userData.id, email: userData.email }, process.env.JWT_SECRET)
                    res.json({ success: true, authToken: authToken, isAdmin: userData.isAdmin })

                } else {
                    res.json({ success: false })
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
})


router.get('/profile', auth, async (req, res) => {
    const userData = await User.findOne({ email: req.user.email })
    if (!userData) {
        res.json({ success: false })
    }
    res.json(userData)
})

router.post('/updateuser', auth, upload.fields([{ name: 'avatar' }, { name: 'licenseFile' }]), async (req, res) => {
    let { name, drivingLicense, nationalId } = req.body
    const avatar = req.files['avatar'] ? req.files['avatar'][0].filename : 'default.jpg'
    const licenseFile = req.files['licenseFile'][0].filename



    let user = await User.findOneAndUpdate({ email: req.user.email }, {
        avatar,
        name,
        licenseFile,
        drivingLicense,
        nationalId
    })
    return res.json({ success: true })
})

router.delete('/deleteuser', auth, async (req, res) => {
    let user = await User.findOneAndDelete({ email: req.user.email })
    
    return res.json({ success: true, message: 'User deleted successfully' })
})



export default router