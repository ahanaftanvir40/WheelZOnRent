import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('homepage')
})

app.get('/cars', (req, res) => {

    const cars = [
        {
            id: 1,
            name: 'GTR32'


        },
        {
            id: 2,
            name: 'Silvia S15'
        }
    ]

    res.send(cars)
})



app.listen(port, () => {
    console.log(`server is running on ${port}`);
})