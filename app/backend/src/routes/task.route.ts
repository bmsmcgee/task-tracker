// src/routes/task.route.ts

import { Router } from "express";
import {
  getAllTasks,
  createTask,
  getTaskById,
  updateTaskById
} from "../controllers/task.controller.js";

// Create a new router instance
const router = Router();

// Define a GET route for fetching all tasks and link it to the controller
router.get("/tasks", getAllTasks);

// Define a POST route for creating a new task and link it to the controller
router.post("/tasks", createTask);

// Define a GET route for fetching a task by ID and link it to the controller
router.get("/tasks/:id", getTaskById);

// Define a PUT route for updating a task by ID and link it to the controller
router.put("/tasks/:id", updateTaskById);

export default router;
