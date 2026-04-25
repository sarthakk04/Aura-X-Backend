import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { createUser, getUserByEmail, getUserById } from "../services/users.services.js";

// Create User
export const createUserController = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await createUser({ name, email, password })

    return res.status(201).json(new ApiResponse(201, user, 'User Created Successfully'))
}

// Fetch user from mail
export const getUserByEmailController = async (req, res) => {
    const { email } = req.query

    if (!email) {
        throw new ApiError(400, 'Valid Eail is required')
    }

    const userDataByEmail = await getUserByEmail(email)

    return res.status(201).json(new ApiResponse(201, userDataByEmail, `User with email : ${email} fetched successfully`))
}

// Fetch user from id : Unique ID like uui pending 
export const getUserByIdController = async (req, res) => {
    const { id } = req.params
    if (!id) {
        throw new ApiError(400, "Id is Required")
    }
    const userDataById = await getUserById(id);
    return res.status(201).json(new ApiResponse(201, userDataById, `User with Id : ${id} fetched successfully`))
}