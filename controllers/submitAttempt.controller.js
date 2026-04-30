// controller 
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js"
import { submitAttempt } from "../services/submitAttempt.services.js";

export const submitAttemptController = async (req, res) => {
    const { attemptId, answers } = req.body

    if (!attemptId || !answers || !Array.isArray(answers)) {
        throw new ApiError(400, "AttemptId and answers are required")
    }

    if (answers.length === 0) {
        throw new ApiError(400, "Answers cannot be empty")
    }

    const submit = await submitAttempt({
        userId: req.user.id,
        answers,
        attemptId

    })

    return res.status(201).json(new ApiResponse(201, submit, "Attempt submitted success"))
}