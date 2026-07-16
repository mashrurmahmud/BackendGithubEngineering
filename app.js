import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/db.js'
import cors from 'cors'
import jobrouter from './router/JobRouter.js'
import authRouter from './router/AuthRouter.js'

dotenv.config()




const app = express()


const PORT = process.env.PORT || 5000


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors())


app.use('/job', jobrouter)
app.use('/user', authRouter)





export default app