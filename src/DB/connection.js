import mongoose from "mongoose";

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB connection: Success')
    } catch (error) {
        console.log('error connecting to MongoDB')
    }
}

export default connectDB