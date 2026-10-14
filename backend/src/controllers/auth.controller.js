
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { setAuthCookies } from "../utils/setAuthCookies.js";
import {
  sendSuccess,
  sendError,
} from "../utils/apiResponse.js";

import { configs } from "../configs/config.js";

/**
 * @POST
 * @route /api/auth/register
 * @desc Register a new user
 * @access Public
 */
export async function registerController(req, res) {
  try {
    const { fullname, email, password, phone } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { phone }],
    });

    if (existingUser) {
      return sendError(
        res,
        "Email or phone number already registered",
        409
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with default role
    const user = await User.create({
      fullname: fullname.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone,
      role: "user",
    });

    // Generate tokens and set HTTP-only cookies
    setAuthCookies(res, user);

    // Send success response
    return sendSuccess(res, "User Registered Successfully", 201, {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle duplicate email or phone
    if (error.code === 11000) {
      return sendError(
        res,
        "Email or phone number already registered",
        409
      );
    }

    return sendError(res, "Internal server error", 500);
  }
}

/**
 * @POST
 * @route /api/auth/login
 * @desc Login an existing user
 * @access Public
 */
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    // Find user and include password
    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    // Use the same error for unknown email and wrong password
    if (!user) {
      return sendError(
        res,
        "Invalid email or password",
        401
      );
    }

    // Compare password with stored hash
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return sendError(
        res,
        "Invalid email or password",
        401
      );
    }

    // Generate tokens and set HTTP-only cookies
    setAuthCookies(res, user);

    // Send success response
    return sendSuccess(res, "Login Successful", 200, {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Login error:", error);

    return sendError(res, "Internal server error", 500);
  }
}

/**
 * @POST
 * @route /api/auth/logout
 * @desc Logout an existing user
 * @access Protected 
 */

export async function logoutController(req, res) {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: configs.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: configs.NODE_ENV === "production",
      sameSite: "lax",
    })

    return sendSuccess(res, "Logout Successful", 200)

  } catch (error) {
    console.error("Logout error:", error);

    return sendError(res, "Internal Server error", 500)
  }

}


/**
 * @GET
 * @ROUTE /api/auth/me
 * @desc Get current logged in user profile
 * @access Protected
 */
export async function getMeController(req,res) {
  try{
    const user = await User.findById(req.user.id);
    if(!user){
      return sendError(res,"User not found",404)
    }
    return sendSuccess(res,"User Profile",200,{
      id:user._id,
      fullname:user.fullname,
      email:user.email,
      phone:user.phone,
      role:user.role,
      profilePicture:user.profilePicture,
    });

  }catch(error){
      console.error("Get profile error:", error);
      return sendError(res, "Internal server error", 500);

  }
  
}