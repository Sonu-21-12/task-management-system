const { z } = require("zod");

const createTaskSchema = z.object({
    title: z
        .string()
        .min(3, "Title must contain at least 3 characters")
        .max(255, "Title is too long"),

    description: z
        .string()
        .optional()
        .nullable(),

    status: z
        .enum([
            "pending",
            "in_progress",
            "completed",
            "blocked"
        ])
        .optional()
        .default("pending"),

    priority: z
        .enum([
            "low",
            "medium",
            "high",
            "urgent"
        ])
        .optional()
        .default("medium"),

    assigned_to: z
        .number()
        .int()
        .positive()
        .nullable()
        .optional(),

    due_date: z
        .string()
        .nullable()
        .optional()
});

const updateTaskSchema = z.object({
    title: z
        .string()
        .min(3)
        .max(255)
        .optional(),

    description: z
        .string()
        .nullable()
        .optional(),

    status: z
        .enum([
            "pending",
            "in_progress",
            "completed",
            "blocked"
        ])
        .optional(),

    priority: z
        .enum([
            "low",
            "medium",
            "high",
            "urgent"
        ])
        .optional(),

    assigned_to: z
        .number()
        .int()
        .positive()
        .nullable()
        .optional(),

    due_date: z
        .string()
        .nullable()
        .optional()
});

module.exports = {
    createTaskSchema,
    updateTaskSchema
};