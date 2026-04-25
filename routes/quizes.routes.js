import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createQuizController, getQuizByShareTokenController, getQuizByUserController } from "../controllers/quizes.controller.js";

export const quizRoute = Router();

quizRoute.post('/new/create-quiz', authMiddleware, asyncHandler(createQuizController))

quizRoute.get('/me', authMiddleware, asyncHandler(getQuizByUserController))

quizRoute.get('/:shareToken', asyncHandler(getQuizByShareTokenController))