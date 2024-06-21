import express from 'express'
import { auth } from '../middlewares/auth.js'
import { Vehicle } from '../models/vehicle.models.js';
import { User } from '../models/user.models.js';
import { upload } from '../config/multer-config.js'

const router = express.Router()


router.post('/vehicles', auth, upload.array('vehicleImages', 5), async (req, res) => {
    const {
        description,
        type,
        brand,
        model,
        year,
        pricePerDay,
        location,
        availability,
        category,
        condition,
        no_plate,
        chassis_no,
        registration_no,
    } = req.body;

    try {
        // console.log(req.files);
        const images = req.files.map(file => file.filename);

        const vehicle = await Vehicle.create({
            ownerId: req.user.id,
            description,
            type,
            brand,
            model,
            year,
            pricePerDay,
            location,
            availability,
            images,
            category,
            condition,
            no_plate,
            chassis_no,
            registration_no,
        });

        await vehicle.save();

        const user = await User.findOne({ email: req.user.email });
        user.added_vehicle_id.push(vehicle._id);
        await user.save();

        res.json({ success: true, vehicleId: vehicle.id });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
});

router.get('/vehicles/:vehicleId', auth, async (req, res) => {
    let vehicleData = await Vehicle.findOne({ _id: req.params.vehicleId }).populate('ownerId')
    //console.log(vehicleData);
    res.json(vehicleData)
})

router.get('/allvehicles', async (req, res) => {

    const { search } = req.query || ''
    const searchTerms = search.split(' ').map((term) => new RegExp(term, 'i'))

    //console.log(searchTerms);

    try {


        let vehicleData = await Vehicle.find({
            $and: searchTerms.map(term => ({
                $or: [
                    { brand: term },
                    { model: term },
                    { category: term },
                    { location: term }

                ]
            }))

        })
        return res.json(vehicleData)

    } catch (error) {
        console.log(error);
    }

})



export default router