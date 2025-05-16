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

// Controller to fetch a task by its ID from the database
export const getTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findById(id); // Fetch the task by ID from the database

    if (!task) {
      res.status(404).json({ error: "Task not found" }); // Send a 404 error if the task is not found
      return;
    }
    res.status(200).json(task); // Send the found task as a JSON response
  } catch (error) {
    console.error(`Failed to fetch task with ID ${id}`, error); // Log the error
    res.status(400).json({ error: "Invalid task ID format" }); // Send a 400 error if the ID format is invalid
  }
};

// Controller to update a task by its ID in the database
export const updateTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  // Prevent the _id field from being updated
  if (req.body._id) {
    delete req.body._id;
  }

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate the update against the schema
    });

    // Check if the task was found and updated
    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" }); // Send a 404 error if the task is not found
      return;
    }
    res.status(200).json(updatedTask); // Send the updated task as a JSON response
  } catch (error) {
    console.error(`Failed to update task with ID ${id}`, error); // Log the error
    res.status(400).json({ error: "Invalid update data or task ID" }); // Send a 400 error if the ID format is invalid
  }
};

// Controller to delete a task by its ID from the database
export const deleteTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedTask = await TaskModel.findByIdAndDelete(id); // Delete the task by ID from the database

    // Check if the task was found and deleted
    if (!deletedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json({ message: "Task deleted successfully" }); // Send a success message
  } catch (error) {
    console.error(`Failed to delete task ${id}`, error); // Log the error
    res.status(400).json({ error: "Invalid task ID format" }); // Send a 400 error if the ID format is invalid
  }
};
