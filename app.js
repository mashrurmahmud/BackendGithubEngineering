import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/db.js'
import cors from 'cors'
import jobrouter from './router/JobRouter.js'
import authRouter from './router/AuthRouter.js'
import cookieParser from 'cookie-parser'
import applyRouter from './router/ApplyRouter.js'

dotenv.config()




const app = express()


const PORT = process.env.PORT || 5000


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}

))

app.use(cookieParser())


app.use('/job/job-bazar', jobrouter)
app.use('/user', authRouter);

app.use('/apply', applyRouter);


app.get('/', (req, res) => {
    res.send('hello world')
})


export default app