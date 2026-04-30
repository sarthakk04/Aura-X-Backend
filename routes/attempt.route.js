import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { startAttemptController } from "../controllers/attempts.controller.js";
import { submitAttemptController } from "../controllers/submitAttempt.controller.js";

export const attemptRoute = Router()

attemptRoute.post("/start", authMiddleware, asyncHandler(startAttemptController))
attemptRoute.post("/submit", authMiddleware, asyncHandler(submitAttemptController))