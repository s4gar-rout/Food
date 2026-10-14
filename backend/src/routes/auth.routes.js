
import { Router } from "express";
import { loginController, registerController,logoutController ,getMeController} from "../controllers/auth.controller.js";
import { registerValidator,loginValidator } from "../validators/auth.validator.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * 
 * @route POST /api/auth/register
 * @desc:  Controller for user registration
 * @access : public
 * 
 */ 

router.post("/register", registerValidator,validateRequest, registerController);

/**
 * 
 * @route POST /api/auth/login
 * @desc: Controller for user login
 * @access : public
 * 
 */

router.post("/login",loginValidator,validateRequest, loginController)


/**
 * 
 * @route POST /api/auth/logout
 * @desc: Controller for user logout
 * @access : protected
 * 
 */

router.post("/logout",authMiddleware,logoutController)


/**
 * 
 * @route GET /api/auth/me
 * @desc: Controller for user profile
 * @access : protected
 * 
 */

router.get("/me",authMiddleware,getMeController)

export default router;
