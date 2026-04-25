import { createQuiz, getQuizByShareToken, getQuizByUser } from "../services/quizes.services.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js"

export const createQuizController = async (req, res) => {
    const { title, description, questions } = req.body;

    if (!title || !questions) {
        throw new ApiError(401, "Title or Questions for the quiz is required")
    }

    const quiz = await createQuiz({
        title, description, questions
    }, req.user.id)

    return res.status(201).json(new ApiResponse(201, quiz, "Quiz created successfully"))
}


export const getQuizByShareTokenController = async (req, res) => {
    const { shareToken } = req.params;
    if (!shareToken) {
        throw new ApiError(400, "Share Token is required")
    }

    const quiz = await getQuizByShareToken(shareToken)

    return res.status(201).json(new ApiResponse(201, quiz, "Quiz fetched SuccessFully"))

}

export const getQuizByUserController = async(req, res) => {
    const userId = req.user.id

    const quizzes = await getQuizByUser(userId)

    return res.status(201).json(new ApiResponse(201, quizzes, `Quizes of userId : ${userId} fetched Successfully`))
}