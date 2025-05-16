// src/index.ts

import { ok } from 'assert';
import express from 'express';      // Import express

// Create an instance of express
const app = express();             

// Set the port to 3000 or use the environment variable PORT
const PORT = process.env.PORT || 3000; 

// Register a simple GET route at /api/health
// This will act as a "ping" endpoint to check if the server is running
app.get("/api/health", (req, res) => {
    // Send a 200 OK response with a JSON object
    res.status(200).json({ ok: true });
})

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})