// src/controllers/task.controller.ts

import { Request, Response } from "express";
import { TaskModel } from "../models/task.model.js";

// Controller to fetch all tasks from the database
export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await TaskModel.find();   // Fetch all tasks from the database
    res.status(200).json(tasks);            // Send the tasks as a JSON response
  } catch (error) {
    console.error("Failed to fetch tasks:", error);             // Log the error
    res.status(500).json({ error: "Internal Server Error " });  // Send a 500 error response
  }
};
