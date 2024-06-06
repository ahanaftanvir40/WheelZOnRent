import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import './config/mongoose-connection.js'
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

app.use('/api', userRoutes)

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('homepage')
})




app.listen(port, () => {
    console.log(`server is running on ${port}`);
})