import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable in your .env.local file");
  }
  
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
}
