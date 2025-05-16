// src/index.ts

import express from 'express';      // Import express
import healthRouter from './routes/health.route.js'; // Import the health route

// Create an instance of express
const app = express();             

// Set the port to 3000 or use the environment variable PORT
const PORT = process.env.PORT || 3000; 

// Mount the health router on the /api path
// This means that any request to /api/health will be handled by the health router
app.use("/api", healthRouter)

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})