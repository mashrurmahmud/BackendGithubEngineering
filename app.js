import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/db'

dotenv.config()




const app = express()


const PORT = process.env.PORT || 5000