import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;

if(!process.env.MONGODB_URL){
  throw new Error(
    "Please provide MONGODB_URL in the env.file");
}

async function connectDB () {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect DB");
  } catch (error) {
    console.error("Mongodb connect error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
