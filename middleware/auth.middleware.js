import prisma from "../db/db.js";
import { ApiError } from "../utils/apiError.js";
import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ApiError(401, "Unauthorized"));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });

        if (!user) {
            return next(new ApiError(401, "User no longer exists"));
        }

        req.user = user;

        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return next(new ApiError(401, "Token expired"));
        }

        return next(new ApiError(401, "Invalid token"));
    }
};