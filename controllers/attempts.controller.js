import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { startAttempt } from "../services/attempts.services.js";

export const startAttemptController = async (req, res) => {
    const { shareToken } = req.body

    if (!shareToken) {
        throw new ApiError(400, "Share Token is missing")
    }

    const attempt = await startAttempt({
        userId: req.user.id,
        shareToken
    })

    return res.
        status(201).
        json(new ApiResponse(201, attempt, "Attempt started successfully"))
}