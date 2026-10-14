import { configs } from "../configs/config.js";
import { generateAccessToken, generateRefreshToken } from "./generateToken.js";

export const setAuthCookies = (res, user) => {
    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const isProduction = configs.NODE_ENV === "production";

    // Set cookies
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        maxAge: 10 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
}

