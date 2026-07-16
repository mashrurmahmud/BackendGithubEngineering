
import { connectDB } from "./db/db.js"
import app from "./app.js"

import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT






const startServer= async()=>{
    try{
        await connectDB();
        app.listen(port, ()=>{
            console.log(`Server is running on port ${port}`)
        })

    }catch(error){
        console.log(error, "fail to load server")
        process.exit(1)
    }
}


startServer()

export default app