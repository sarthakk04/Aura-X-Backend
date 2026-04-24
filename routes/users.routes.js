import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { createUserController, getUserByEmailController, getUserByIdController } from "../controllers/users.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const userRoute = Router();

userRoute.post('/createUser', asyncHandler(createUserController))
userRoute.get('/getUserByEmail', asyncHandler(authMiddleware), asyncHandler(getUserByEmailController))
userRoute.get('/:id', asyncHandler(authMiddleware), asyncHandler(getUserByIdController))

export default userRoute