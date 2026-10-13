
import { configs } from "../configs/config.js";

import jwt from "jsonwebtoken"

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        configs.JWT_ACCESS_SECRET,
        {
            expiresIn: configs.ACCESS_TOKEN_EXPIRES_IN || "10m"
        }

    )
}


export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user._id
        },
        configs.JWT_REFRESH_SECRET,
        {
            expiresIn: configs.REFRESH_TOKEN_EXPIRES_IN || "7d"
        }
    )
}    