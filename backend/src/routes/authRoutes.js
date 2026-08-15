const express = require("express");

const {
    register,
    login,
    getMe
} = require("../controllers/authController");

const validate = require("../middleware/validateMiddleware");

const authenticate = require("../middleware/authMiddleware");

const {
    registerSchema,
    loginSchema
} = require("../validators/authValidator");

const router = express.Router();


router.post(
    "/register",
    validate(registerSchema),
    register
);


router.post(
    "/login",
    validate(loginSchema),
    login
);


router.get(
    "/me",
    authenticate,
    getMe
);


module.exports = router;