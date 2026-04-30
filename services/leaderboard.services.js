import prisma from "../db/db.js";
import { ApiError } from "../utils/apiError.js";

export const getLeaderBoard = async (quizId) => {
    const quiz = await prisma.quiz.findUnique({
        where: { id: quizId }
    })

    if (!quiz) {
        throw new ApiError(400, "Quiz not found")
    }

    const leaderBoard = await prisma.attempt.findMany({
        where: { quizId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        orderBy: {
            score: "desc"
        }
    })
    return leaderBoard
}