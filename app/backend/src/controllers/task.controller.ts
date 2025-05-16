// src/controllers/task.controller.ts

import { Request, Response } from "express";
import { TaskModel } from "../models/task.model.js";

// Controller to fetch all tasks from the database
export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Extract query parameters from the request
    // These parameters can be used to filter, sort, and search tasks
    const {
      status,
      priority,
      search,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    // Create a filter object based on the query parameters
    const filter: Record<string, any> = {};

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    // Validate the sortBy and order parameters
    const sortOrder = order === "asc" ? 1 : -1; // Default to descending order
    const sort: [string, 1 | -1][] = [[String(sortBy), sortOrder]]; // Create a sort array

    const userID = (<any>req).userId; // Extract user ID from the request object

    // Fetch tasks from the database based on the filter and sort criteria
    const tasks = await TaskModel.find({
      ...filter,
      owner: userID, // Filter tasks by the authenticated user's ID
    }).sort(sort);

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
    const userID = (<any>req).userId; // Extract user ID from the request object

    const newTask = await TaskModel.create({
      ...req.body,
      owner: userID, // Set the owner of the task to the authenticated user
    });

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
  const userID = (<any>req).userId; // Extract user ID from the request object

  try {
    const task = await TaskModel.findOne({
      _id: id,
      owner: userID, // Ensure the task belongs to the authenticated user
    }); // Fetch the task by ID from the database

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
  const userID = (<any>req).userId; // Extract user ID from the request object

  // Prevent the _id field from being updated
  if (req.body._id) {
    delete req.body._id;
  }

  try {
    const updatedTask = await TaskModel.findOneAndUpdate(
      {
        _id: id,
        owner: userID,
      },
      req.body,
      {
        new: true, // Return the updated document
        runValidators: true, // Validate the update against the schema
      }
    );

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
  const userID = (<any>req).userId; // Extract user ID from the request object

  try {
    const deletedTask = await TaskModel.findOneAndDelete({
      _id: id,
      owner: userID, // Ensure the task belongs to the authenticated user
    }); // Delete the task by ID from the database

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
