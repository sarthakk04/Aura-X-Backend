import prisma from "../db/db.js";
import { ApiError } from "../utils/apiError.js";

export const startAttempt = async ({ userId, shareToken }) => {
    const quiz = await prisma.quiz.findUnique({
        where: {
            shareToken
        }
    })

    if (!quiz) {
        throw new ApiError(400, "Quiz not found")
    }

    const existingAttempt = await prisma.attempt.findUnique({
        where: {
            userId_quizId: {
                userId,
                quizId: quiz.id
            }
        }
    })

    if (existingAttempt) {
        throw new ApiError(400, `User with id : ${userId} has already attempted the quiz`)
    }

    const createAttempt = await prisma.attempt.create({
        data: {
            userId,
            quizId: quiz.id,
            score: 0
        }
    })

    return createAttempt
}