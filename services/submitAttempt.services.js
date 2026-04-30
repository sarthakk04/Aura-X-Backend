// service 

import prisma from "../db/db.js";
import { ApiError } from "../utils/apiError.js";

export const submitAttempt = async ({ userId, answers, attemptId }) => {
    const attempt = await prisma.attempt.findUnique({
        where: {
            id: attemptId
        },
        include: {
            quiz: {
                include: {
                    questions: {
                        include: {
                            options: true
                        }
                    }
                }
            }
        }
    })

    if (!attempt) {
        throw new ApiError(404, "Attempt not found")
    }
    if (attempt.userId !== userId) {
        throw new ApiError(404, "Unauthorized attempt")
    }
    const existingUser = await prisma.answer.findFirst({
        where: { attemptId }
    })

    if (existingUser) {
        throw new ApiError(404, "User has already attempted")
    }

    const questionMap = new Map()
    const optionsMap = new Map()

    attempt.quiz.questions.forEach((q) => {
        questionMap.set(q.id, q)

        q.options.forEach((o) => {
            optionsMap.set(o.id, o)
        })
    })

    let score = 0;
    let answersData = []

    for (const ans of answers) {
        const { questionId, selectedOptionId } = ans
        const question = questionMap.get(questionId)
        if (!question) {
            throw new ApiError(404, "Invalid questionId")
        }
        const option = optionsMap.get(selectedOptionId)
        if (!option) {
            throw new ApiError(404, "Invalid option id")
        }

        if (option.questionId !== questionId) {
            throw new ApiError(404, "Option does not belong to this question")
        }

        if (option.isCorrect) {
            score += question.points;
        }

        answersData.push({
            attemptId,
            questionId,
            selectedOptionId
        })
    }

    await prisma.answer.createMany({
        data: answersData
    })


    await prisma.attempt.update({
        where: { id: attempt.id },
        data: { score }
    })


    return {
        score,
        totalQuestions: attempt.quiz.questions.length
    }
}