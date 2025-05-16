// src/controllers/task.controller.ts

import { Request, Response } from "express";
import { TaskModel } from "../models/task.model.js";

// Controller to fetch all tasks from the database
export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await TaskModel.find(); // Fetch all tasks from the database
    res.status(200).json(tasks); // Send the tasks as a JSON response
  } catch (error) {
    console.error("Failed to fetch tasks:", error); // Log the error
    res.status(500).json({ error: "Internal Server Error " }); // Send a 500 error response
  }
};

// Controller to create a new task in the database
export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newTask = await TaskModel.create(req.body); // Create a new task using the request body
    res.status(200).json(newTask); // Send the created task as a JSON response
  } catch (error) {
    console.error("Failed to create task:", error); // Log the error
    res.status(400).json({ error: "Invalid task data" }); // Send a 400 error response
  }
};
