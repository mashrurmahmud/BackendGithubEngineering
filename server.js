import { connectDB } from "./db/db"






const startServer= async()=>{
    try{
        await connectDB()

    }
}