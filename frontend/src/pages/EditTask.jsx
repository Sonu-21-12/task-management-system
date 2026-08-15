import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getTaskById,
    updateTask
} from "../services/taskService";

import { getUsers } from "../services/userService";

function EditTask() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        assigned_to: "",
        due_date: ""
    });


    // =========================
    // LOAD TASK + USERS
    // =========================

    useEffect(() => {

        const loadData = async () => {

            try {

                setLoading(true);
                setError("");

                const [taskResponse, usersResponse] =
                    await Promise.all([
                        getTaskById(id),
                        getUsers()
                    ]);


                console.log(
                    "Edit task response:",
                    taskResponse
                );

                console.log(
                    "Users response:",
                    usersResponse
                );


                // -------------------------
                // TASK
                // -------------------------

                if (!taskResponse.success) {

                    setError(
                        taskResponse.message ||
                        "Unable to load task"
                    );

                    return;
                }


                const task = taskResponse.data;


                // -------------------------
                // DATE
                // -------------------------

                let dueDate = "";

                if (task.due_date) {

                    dueDate =
                        new Date(task.due_date)
                            .toISOString()
                            .split("T")[0];

                }


                setFormData({

                    title: task.title || "",

                    description:
                        task.description || "",

                    status:
                        task.status || "pending",

                    priority:
                        task.priority || "medium",

                    assigned_to:
                        task.assigned_to
                            ? String(task.assigned_to)
                            : "",

                    due_date: dueDate

                });


                // -------------------------
                // USERS
                // -------------------------

                if (usersResponse.success) {

                    setUsers(
                        usersResponse.data || []
                    );

                }

            } catch (error) {

                console.error(
                    "Load edit task error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load task"
                );

            } finally {

                setLoading(false);

            }

        };


        loadData();

    }, [id]);


    // =========================
    // INPUT CHANGE
    // =========================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData((previous) => ({

            ...previous,

            [name]: value

        }));

    };


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");


        // Validation

        if (!formData.title.trim()) {

            setError(
                "Task title is required."
            );

            return;

        }


        try {

            setSaving(true);


            const payload = {

                title:
                    formData.title.trim(),

                description:
                    formData.description.trim(),

                status:
                    formData.status,

                priority:
                    formData.priority,

                assigned_to:
                    formData.assigned_to
                        ? Number(formData.assigned_to)
                        : null,

                due_date:
                    formData.due_date || null

            };


            console.log(
                "Updating task:",
                payload
            );


            const response =
                await updateTask(
                    id,
                    payload
                );


            console.log(
                "Update task response:",
                response
            );


            if (!response.success) {

                setError(
                    response.message ||
                    "Unable to update task"
                );

                return;

            }


            setSuccess(
                "Task updated successfully."
            );


            // Redirect after save

            setTimeout(() => {

                navigate(
                    `/tasks/${id}`
                );

            }, 800);


        } catch (error) {

            console.error(
                "Update task error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to update task"
            );

        } finally {

            setSaving(false);

        }

    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <div className="min-h-screen bg-gray-100 flex items-center justify-center">

                <div className="text-center">

                    <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

                    <p className="text-gray-500">
                        Loading task...
                    </p>

                </div>

            </div>

        );

    }


    // =========================
    // PAGE
    // =========================

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-4xl mx-auto">


                {/* Back */}

                <button
                    onClick={() =>
                        navigate(
                            `/tasks/${id}`
                        )
                    }
                    className="text-blue-600 hover:underline mb-5"
                >
                    ← Back to Task
                </button>


                {/* Card */}

                <div className="bg-white rounded-2xl shadow-sm p-8">


                    {/* Header */}

                    <div className="mb-8">

                        <h1 className="text-3xl font-bold text-gray-900">
                            Edit Task
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Update task information,
                            status and assignment.
                        </p>

                    </div>


                    {/* Error */}

                    {error && (

                        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
                            {error}
                        </div>

                    )}


                    {/* Success */}

                    {success && (

                        <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
                            {success}
                        </div>

                    )}


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >


                        {/* Title */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Task Title *
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* Description */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={
                                    formData.description
                                }
                                onChange={handleChange}
                                rows="5"
                                placeholder="Describe the task..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />

                        </div>


                        {/* Status + Priority */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                            {/* Status */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={
                                        formData.status
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
                                >

                                    <option value="pending">
                                        Pending
                                    </option>

                                    <option value="in_progress">
                                        In Progress
                                    </option>

                                    <option value="completed">
                                        Completed
                                    </option>

                                    <option value="blocked">
                                        Blocked
                                    </option>

                                </select>

                            </div>


                            {/* Priority */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Priority
                                </label>

                                <select
                                    name="priority"
                                    value={
                                        formData.priority
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
                                >

                                    <option value="low">
                                        Low
                                    </option>

                                    <option value="medium">
                                        Medium
                                    </option>

                                    <option value="high">
                                        High
                                    </option>

                                    <option value="urgent">
                                        Urgent
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* Assignee + Due Date */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                            {/* Assignee */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Assign To
                                </label>

                                <select
                                    name="assigned_to"
                                    value={
                                        formData.assigned_to
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
                                >

                                    <option value="">
                                        Unassigned
                                    </option>


                                    {users.map(
                                        (user) => (

                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name}
                                                {" "}
                                                ({user.email})
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            {/* Due Date */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Due Date
                                </label>

                                <input
                                    type="date"
                                    name="due_date"
                                    value={
                                        formData.due_date
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                        </div>


                        {/* Buttons */}

                        <div className="flex justify-end gap-4 pt-6 border-t">


                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/tasks/${id}`
                                    )
                                }
                                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >

                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditTask;