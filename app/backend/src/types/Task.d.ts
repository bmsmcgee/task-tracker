// src/types/Task.d.ts

export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

// Interface for a task object
export interface Task {
  title: string; // Title of the task
  description?: string; // Description of the task (Optional)
  status: TaskStatus; // Current status of the task
  priority: TaskPriority; // Priority level of the task
  dueDate?: Date; // Due date for the task (Optional)
  completed: boolean; // Indicates if the task is completed
  createdAt: Date; // Date when the task was created
  updatedAt: Date; // Date when the task was last updated
  owner: string; // ID of the user who owns the task
}
