import { loginUser } from "../services/auth.services.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";


export const loginController = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email or Password is Required");
    }

    const loginResult = await loginUser({ email, password })

    return res.status(201).json(new ApiResponse(201, loginResult, "Login Success"))
}