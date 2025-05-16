// src/routes/task.route.ts

import { Router } from "express";
import { getAllTasks } from "../controllers/task.controller.js";

// Create a new router instance
const router = Router();

// Define a GET route for fetching all tasks and link it to the controller
router.get("/tasks", getAllTasks); 

export default router;