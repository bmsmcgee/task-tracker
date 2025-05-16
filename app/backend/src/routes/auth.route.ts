// src/routes/auth.route.ts

import { Router } from "express";
import { signup, login } from "../controllers/auth.controller.js";

const router = Router();

// POST /api/auth/signup - Register a new user
router.post("/signup", signup);

// POST /api/auth/login - Authenticate an existing user
router.post("/login", login);

export default router;