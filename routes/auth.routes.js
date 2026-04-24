import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { loginController } from "../controllers/auth.controller.js";
export const authRoute = Router();

authRoute.post('/login', asyncHandler(loginController))