// src/routes/health.route.ts

import { Router } from 'express';
import { getHealthStatus } from '../controllers/health.controller.js';
// Create a new router instance
const router = Router();

// Define a GET route for the health check and link it to the controller
router.get("/", getHealthStatus);

// Export the router to be used in the main application
export default router;