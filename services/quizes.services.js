import prisma from "../db/db.js";
import { ApiError } from "../utils/apiError.js";


export const createQuiz = async (data, userId) => {
    const { title, description, questions } = data

    if (!questions || questions.length === 0) {
        throw new ApiError(400, "Quiz must have atleast one question")
    }

    const quiz = await prisma.quiz.create({
        data: {
            title,
            description,
            createdBy: userId,

            questions: {
                create: questions.map((q) => {
                    if (!q.options || q.options.length < 2) {
                        throw new ApiError(400, "Each question must have atleast 2 options")
                    }

                    const correctOptions = q.options.filter((opt) => opt.isCorrect);

                    if (correctOptions.length != 1) {
                        throw new ApiError(400, "Each question must have only one correct options")
                    }

                    return {
                        text: q.text,
                        points: q.points || 1,

                        options: {
                            create: q.options.map((opt) => ({
                                text: opt.text,
                                isCorrect: opt.isCorrect
                            }))
                        }
                    }
                })
            }
        },

        include: {
            questions: {
                include: {
                    options: true
                }
            }
        }
    })
    return quiz
}


export const getQuizByShareToken = async (shareToken) => {
    const quiz = await prisma.quiz.findUnique({
        where: { shareToken },

        include: {
            questions: {
                include: {
                    options: {
                        select: {
                            id: true,
                            text: true
                        }
                    }
                }
            }
        }
    })

    if (!quiz) {
        throw new ApiError(404, "Quiz Not Found")
    }

    return quiz;
}

export const getQuizByUser = async (userId) => {
    return await prisma.quiz.findMany({
        where: { createdBy: userId },
        orderBy: { createdAt: "desc" }
    })
}