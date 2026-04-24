import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";

export const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
});

router.get('/protected', asyncHandler(authMiddleware), asyncHandler(async (req, res) => {
    res.json({
        message: "Access Granted through middleWare",
        user: req.user
    })
}))