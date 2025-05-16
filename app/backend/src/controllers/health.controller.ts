// src/controllers/health.controller.ts

import { Request, Response } from 'express';

/**
 * Health check controller to respond with a simple status message.
 * @param req - The request object.
 * @param res - The response object.
 */
export const getHealthStatus = (req: Request, res: Response): void => {
    res.status(200).json({ ok: true });
}