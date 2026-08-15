const taskService = require("../services/taskService");


// CREATE TASK
const createTask = async (req, res, next) => {

    try {

        const {
            title,
            description,
            status,
            priority,
            assigned_to,
            due_date
        } = req.body;


        const taskId = await taskService.createTask({

            title,
            description,
            status,
            priority,
            assigned_to,
            due_date,

            // Current logged-in user
            created_by: req.user.id
        });


        const task = await taskService.findTaskById(taskId);


        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task
        });

    } catch (error) {

        next(error);
    }
};



// GET ALL TASKS
const getTasks = async (req, res, next) => {

    try {

        const {
            search,
            status,
            priority,
            assignee,

            page = 1,
            limit = 20,

            sortBy = "created_at",
            sortOrder = "desc"

        } = req.query;


        const pageNumber =
            Math.max(parseInt(page) || 1, 1);

        const limitNumber =
            Math.min(
                Math.max(parseInt(limit) || 20, 1),
                100
            );


        const result =
            await taskService.getTasks({

                search,
                status,
                priority,
                assignee,

                page: pageNumber,
                limit: limitNumber,

                sortBy,
                sortOrder
            });


        const totalPages =
            Math.ceil(
                result.total / limitNumber
            );


        return res.status(200).json({

            success: true,

            data: result.tasks,

            pagination: {
                page: pageNumber,
                limit: limitNumber,
                total: result.total,
                totalPages
            }
        });

    } catch (error) {

        next(error);
    }
};



// GET SINGLE TASK
const getTaskById = async (req, res, next) => {

    try {

        const { id } = req.params;


        const task =
            await taskService.findTaskById(id);


        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }


        return res.status(200).json({
            success: true,
            data: task
        });

    } catch (error) {

        next(error);
    }
};



// UPDATE TASK
const updateTask = async (req, res, next) => {

    try {

        const { id } = req.params;


        const existingTask =
            await taskService.findTaskById(id);


        if (!existingTask) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }


        await taskService.updateTask(
            id,
            req.body
        );


        const updatedTask =
            await taskService.findTaskById(id);


        return res.status(200).json({

            success: true,

            message: "Task updated successfully",

            data: updatedTask
        });

    } catch (error) {

        next(error);
    }
};



// DELETE TASK
const deleteTask = async (req, res, next) => {

    try {

        const { id } = req.params;


        const deleted =
            await taskService.deleteTask(id);


        if (!deleted) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }


        return res.status(200).json({

            success: true,

            message: "Task deleted successfully"
        });

    } catch (error) {

        next(error);
    }
};


module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};