import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { getLeaderBoard } from "../services/leaderboard.services.js";

export const getLeaderBoardController = async (req, res) => {
    const { quizId } = req.params

    if (!quizId) {
        throw new ApiError(400, "QuizId is required")
    }

    const leaderBoard = await getLeaderBoard(quizId)

    return res
        .status(200)
        .json(new ApiResponse(200, leaderBoard, "Leaderboard fetched"));
}