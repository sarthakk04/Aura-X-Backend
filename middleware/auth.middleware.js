import { ApiError } from "../utils/apiError.js"
import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(401, 'Unauthorized');
    }
    
    const extractedToken = authHeader.split(' ')[1];

    try {
        const decodedToken = verifyToken(extractedToken);
        req.user = decodedToken
        next()
    }
    catch (err) {
        throw new ApiError(401, "Invalid Token")
    }
}