const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../config/db");

const register = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            role
        } = req.body;

        // Check existing user
        const [existingUsers] = await db.execute(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const [result] = await db.execute(
            `INSERT INTO users
            (name, email, password, role)
            VALUES (?, ?, ?, ?)`,
            [
                name,
                email,
                hashedPassword,
                role
            ]
        );

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: result.insertId,
                name,
                email,
                role
            }
        });

    } catch (error) {
        next(error);
    }
};


const login = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;

        // Find user
        const [users] = await db.execute(
            `SELECT
                id,
                name,
                email,
                password,
                role
             FROM users
             WHERE email = ?`,
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = users[0];

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "7d"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        });

    } catch (error) {
        next(error);
    }
};


const getMe = async (req, res, next) => {
    try {
        const [users] = await db.execute(
            `SELECT
                id,
                name,
                email,
                role,
                created_at
             FROM users
             WHERE id = ?`,
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: users[0]
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    register,
    login,
    getMe
};