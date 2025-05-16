// src/index.ts

import express from "express"; // Import express
import dotenv from "dotenv"; // Import dotenv for environment variables
import healthRouter from "./routes/health.route.js"; // Import the health route
import { connectToDatabase } from "./config/db.js"; // Import the database connection function

// Load environment variables from .env file
dotenv.config();

// Create an instance of express
const app = express();

// Set the port to 3000 or use the environment variable PORT
const PORT = process.env.PORT || 3000;

// Mount the health router on the /api path
// This means that any request to /api/health will be handled by the health router
app.use("/api", healthRouter);

// Connect to the database and start the server
// The connectToDatabase function will attempt to connect to MongoDB
// If successful, the server will start listening on the specified port
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
