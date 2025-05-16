// src/config/db.ts

import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// MongoDB connection URI
const MONGODB_URI = <string>process.env.MONGODB_URI;

export const connectToDatabase = async (): Promise<void> => {
  try {
    // Attempt to connect to the MongoDB database
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};
