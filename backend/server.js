import express from 'express'
import cookieParser from 'cookie-parser'
// import bodyParser from 'body-parser';
import cors from 'cors'
import './config/mongoose-connection.js'
import userRoutes from './routes/userRoutes.js'
import vehicleRoutes from './routes/vehicleRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import ollamaRoutes from './routes/ollamaRoutes.js'
import dotenv from 'dotenv'
import path from 'path'
import bodyParser from 'body-parser';

dotenv.config()

const app = express()

const __dirname = path.resolve()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', userRoutes)
app.use('/api', vehicleRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api', bookingRoutes)
app.use('/api', notificationRoutes)
app.use('/api/ollama', ollamaRoutes)

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('homepage')
})

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})