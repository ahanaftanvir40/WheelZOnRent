import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import './config/mongoose-connection.js'
import userRoutes from './routes/userRoutes.js'
import vehicleRoutes from './routes/vehicleRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import dotenv from 'dotenv'
import path from 'path'




dotenv.config()

const app = express()


const __dirname = path.resolve()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(cors())

app.use('/api', userRoutes)
app.use('/api', vehicleRoutes)
app.use('/api/admin', adminRoutes)

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('homepage')
})




app.listen(port, () => {
    console.log(`server is running on ${port}`);
})