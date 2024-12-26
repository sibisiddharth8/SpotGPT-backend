import mongoose from "mongoose";
import 'dotenv'

const connectDB = async () =>{
    mongoose.connection.on('connected', ()=>{
        console.log(`MongoDB Connected: ${process.env.MONGODB_URI}/SpotGPT`);
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/SpotGPT`);
}

export default connectDB;