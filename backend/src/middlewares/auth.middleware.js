
import jwt from "jsonwebtoken";
import { configs } from "../configs/config.js";
import { sendError } from "../utils/apiResponse.js";

export function authMiddleware(req, res, next) {
  try {
    // Get access token from HTTP-only cookie
    const token = req.cookies?.accessToken;

    if (!token) {
      return sendError(
        res,
        "Authentication required. Please log in.",
        401
      );
    }

    // Verify access token
    const decoded = jwt.verify(
      token,
      configs.JWT_ACCESS_SECRET
    );

    // Attach authenticated user information to request
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    return next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return sendError(
        res,
        "Invalid or expired access token",
        401
      );
    }

    console.error("Authentication error:", error);

    return sendError(
      res,
      "Internal server error",
      500
    );
  }
}
