// src/controllers/auth.controller.ts

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

const JWT_SECRET = <string>process.env.JWT_SECRET;

// Controller to handle user registration
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    // Create a new user using the request body
    const { username, email, password } = req.body;

    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      res.status(409).json({ error: "Username or email already exists" });
      return;
    }

    const user = new UserModel({ username, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ token, user: { username, email } });
  } catch (error) {
    console.error("Failed to register user:", error);
    res.status(400).json({ error: "Invalid signup data" });
  }
};

// Controller to authenticate an existing user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Failed to authenticate user:", error);
    res.status(400).json({ error: "Invalid login data" });
  }
};
