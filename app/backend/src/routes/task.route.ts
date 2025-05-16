// src/routes/task.route.ts

import { Router } from "express";
import {
  getAllTasks,
  createTask,
  getTaskById,
  updateTaskById,
  deleteTaskById
} from "../controllers/task.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";

// Create a new router instance
const router = Router();

// Apply authentication middleware to all routes
router.use(requireAuth); 

// Define a GET route for fetching all tasks and link it to the controller
router.get("/", getAllTasks);

// Define a POST route for creating a new task and link it to the controller
router.post("/", createTask);

// Define a GET route for fetching a task by ID and link it to the controller
router.get("/:id", getTaskById);

// Define a PUT route for updating a task by ID and link it to the controller
router.put("/:id", updateTaskById);

// Define a DELETE route for deleting a task by ID and link it to the controller
router.delete("/:id", deleteTaskById);

export default router;
