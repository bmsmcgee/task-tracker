// src/middleware/requireAuth.ts

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = <string>process.env.JWT_SECRET;

// Middleware to verify JWT and attach user ID to the request
export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    // Check for Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer ")) { 
        res.status(401).json({ error: "Authorization token missing" });
        return;
    }

    const token = authHeader.split(" ")[1]; // Extract the token from the header

    try {
        // Verify the token and extract user ID
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        (<any>req).userId = decoded.userId; // Attach user ID to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(401).json({ error: "Invalid or expired token" });
    }
}