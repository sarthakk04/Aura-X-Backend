import prisma from "../db/db.js";
import { ApiError } from "../utils/apiError.js";
import bcrypt from "bcrypt";

export const createUser = async (data) => {
    const { name, email, password } = data;

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

export const getUserById = async (id) => {
    const userById = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    })

    if (!userById) {
        throw new ApiError(400, "User not Found")
    }

    return userById
}

export const getUserByEmail = async (email) => {
    const userByEmail = await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    })

    if (!userByEmail) {
        throw new ApiError(400, "User not Found")
    }

    return userByEmail
}

export const updateUser = async (id, data) => { }

export const deleteUser = async (id) => { }