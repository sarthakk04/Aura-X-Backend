import prisma from "../db/db.js";
import { ApiError } from "../utils/apiError.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt.js";

export const loginUser = async ({ email, password }) => {
    const userEmail = await prisma.user.findUnique({
        where: { email },
    })

    if (!userEmail) {
        throw new ApiError(400, "Mail does not exists")
    }

    const isPasswordCorrect = await bcrypt.compare(password, userEmail.password)

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Email or Password is Incorrect")
    }

    const token = generateToken({
        userId: userEmail.id,
        role: userEmail.role
    })
    return token
}