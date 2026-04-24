import { prisma } from "../db/db.js";
import { ApiError } from "../utils/apiError.js";
import bcrypt from "bcrypt";

export const createUser = async (data) => {
    const checkExisiting = await prisma.user.findUnique({
        where: { email }
    })

    if (checkExisiting) {
        throw new ApiError(400, 'User Already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: 'user'
        }
    })

    const { password: _, ...safeUser } = user

    return safeUser


}

export const authenticateUser = async (data) => { }

export const getUserById = async (id) => { }

export const getUserByEmail = async (email) => { }

export const updateUser = async (id, data) => { }

export const deleteUser = async (id) => { }