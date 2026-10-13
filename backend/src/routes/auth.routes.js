
import { Router } from "express";
import { registerController } from "../controllers/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

const router = Router();

// POST /api/v1/auth/register
router.post("/register", registerValidator,validateRequest, registerController);

export default router;
