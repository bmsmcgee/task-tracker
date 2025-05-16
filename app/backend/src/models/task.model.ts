// src/models/task.model.ts

import mongoose, { Schema, Document, Model } from "mongoose";
import type { Task, TaskStatus, TaskPriority } from "../types/Task.js";

// Define the Task interface extending mongoose Document
export interface TaskDocument extends Task, Document {}

// Define the Task schema
const TaskSchema: Schema<TaskDocument> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    status: {
      type: String,
      required: true,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
      required: false,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the Task model using the schema
export const TaskModel: Model<TaskDocument> = mongoose.model<TaskDocument>(
  "Task",
  TaskSchema
);
