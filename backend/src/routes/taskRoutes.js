const express = require("express");

const authenticate =
    require("../middleware/authMiddleware");

const validate =
    require("../middleware/validateMiddleware");

const {
    createTaskSchema,
    updateTaskSchema
} = require("../validators/taskValidator");

const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskController");


const router = express.Router();


// All task routes require authentication
router.use(authenticate);


// Create
router.post(
    "/",
    validate(createTaskSchema),
    createTask
);


// Get all
router.get(
    "/",
    getTasks
);


// Get single
router.get(
    "/:id",
    getTaskById
);


// Update
router.put(
    "/:id",
    validate(updateTaskSchema),
    updateTask
);


// Delete
router.delete(
    "/:id",
    deleteTask
);


module.exports = router;