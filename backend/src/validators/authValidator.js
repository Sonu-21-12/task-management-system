const { z } = require("zod");

const registerSchema = z.object({
    name: z
        .string()
        .min(2, "Name must contain at least 2 characters")
        .max(100, "Name is too long"),

    email: z
        .string()
        .email("Please enter a valid email"),

    password: z
        .string()
        .min(6, "Password must contain at least 6 characters")
        .max(100, "Password is too long"),

    role: z
        .enum(["admin", "manager", "member"])
        .optional()
        .default("member")
});

const loginSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email"),

    password: z
        .string()
        .min(1, "Password is required")
});

const createUserSchema = z.object({
    name: z
        .string()
        .min(2)
        .max(100),

    email: z
        .string()
        .email(),

    password: z
        .string()
        .min(6),

    role: z
        .enum([
            "admin",
            "manager",
            "member"
        ])
        .default("member")
});

module.exports = {
    registerSchema,
    loginSchema,
    createUserSchema
};