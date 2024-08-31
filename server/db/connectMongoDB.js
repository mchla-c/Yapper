import mongoose, { mongo } from 'mongoose'
import 'dotenv/config'


const uri = process.env.MONGO_URI

const connectMongoDB = async() => {
    try {
        const conn = await mongoose.connect(uri)
        console.log(`MongoDB connected: ${conn.connection.host}`)

    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`)
        process.exit(1)
    }
}

export default connectMongoDB