const bcrypt = require("bcryptjs");
const userService = require("../services/userService");


// GET ALL USERS
const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();

        return res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        next(error);
    }
};


// GET USER BY ID
const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        next(error);
    }
};


// CREATE USER
const createUser = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            role = "member"
        } = req.body;


        // Check duplicate email
        const existingUser =
            await userService.getUserByEmail?.(email);


        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }


        const hashedPassword =
            await bcrypt.hash(password, 10);


        const userId =
            await userService.createUser({
                name,
                email,
                password: hashedPassword,
                role
            });


        const user =
            await userService.getUserById(userId);


        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    getUsers,
    getUserById,
    createUser
};