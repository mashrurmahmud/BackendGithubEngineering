


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}