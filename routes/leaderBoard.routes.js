import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getLeaderBoardController } from "../controllers/leaderBoard.controller.js";

export const leaderBoardRouter = Router();

leaderBoardRouter.get('/:quizId', authMiddleware, asyncHandler(getLeaderBoardController))

