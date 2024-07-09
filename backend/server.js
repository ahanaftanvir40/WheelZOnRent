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
import http from 'http'
import { Server } from 'socket.io'
import { Socket } from 'dgram'

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
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use('/api', userRoutes)
app.use('/api', vehicleRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api', bookingRoutes)
app.use('/api', notificationRoutes)
app.use('/api/ollama', ollamaRoutes)

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
      }
})

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('homepage')
})


// Socekt-Io-Config

io.on('connetion', (socket)=>{
    console.log('New User Connected');

    socket.on('join', (room)=>{
        socket.join(room)
        console.log(`Uer Joined Room: ${room}`);
    })

    socket.on('message', ({room , message})=>{
        io.to(room).emit('message' , message)
    })
    socket.on('disconnect' , ()=>{
        console.log(`User Disconnected: ${socket.id}`);
    })
})






server.listen(port, () => {
    console.log(`server is running on ${port}`);
})