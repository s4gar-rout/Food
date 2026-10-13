import { body } from 'express-validator'

export const registerValidator = [
    body("fullname")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),


    body("phone")
        .notEmpty()
        .withMessage("Phone number is required")
        .isLength({ min: 10, max: 10 })
        .withMessage("Phone number must be 10 digits long")
        .isNumeric()
        .withMessage("Phone number must be numeric"),

    body("role")
        .optional()
        .isIn(["user", "admin", "delivery", "restuarant-owner"])
        .withMessage("Invalid role"),

]
