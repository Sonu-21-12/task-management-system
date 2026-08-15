import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createTask } from "../services/taskService";
import { getUsers } from "../services/userService";

function CreateTask() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        assigned_to: "",
        due_date: ""
    });

    const [loading, setLoading] = useState(false);
    const [usersLoading, setUsersLoading] = useState(true);
    const [error, setError] = useState("");

    // ==========================
    // LOAD USERS
    // ==========================

    useEffect(() => {

        const loadUsers = async () => {

            try {

                const response = await getUsers();

                console.log("Users response:", response);

                if (response.success) {
                    setUsers(response.data || []);
                }

            } catch (error) {

                console.error("Users error:", error);

                setError("Unable to load users");

            } finally {

                setUsersLoading(false);

            }
        };

        loadUsers();

    }, []);


    // ==========================
    // INPUT CHANGE
    // ==========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };


    // ==========================
    // SUBMIT
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!formData.title.trim()) {
            setError("Task title is required");
            return;
        }

        try {

            setLoading(true);

            const payload = {
                title: formData.title,
                description: formData.description,
                status: formData.status,
                priority: formData.priority,
                assigned_to:
                    formData.assigned_to
                        ? Number(formData.assigned_to)
                        : null,
                due_date:
                    formData.due_date || null
            };

            console.log("Create task payload:", payload);

            const response = await createTask(payload);

            console.log("Create task response:", response);

            if (response.success) {

                navigate("/tasks");

            } else {

                setError(
                    response.message ||
                    "Failed to create task"
                );

            }

        } catch (error) {

            console.error(
                "Create task error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-3xl mx-auto">

                {/* Header */}

                <div className="mb-6">

                    <button
                        onClick={() => navigate("/tasks")}
                        className="text-blue-600 hover:underline mb-3"
                    >
                        ← Back to Tasks
                    </button>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Create New Task
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Add a new task to your team
                    </p>

                </div>


                {/* Form */}

                <div className="bg-white rounded-xl shadow-sm p-6">

                    {error && (

                        <div className="mb-5 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
                            {error}
                        </div>

                    )}


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Title */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Task Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* Description */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Describe the task..."
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* Status + Priority */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
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


                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Priority
                                </label>

                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Assignee */}

                            <div>

    <label className="block text-sm font-medium text-slate-700 mb-2">

        Assign To

    </label>


    <select
        name="assigned_to"
        value={formData.assigned_to || ""}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
    >

        <option value="">
            Select team member
        </option>


        {users.map((user) => (

            <option
                key={user.id}
                value={user.id}
            >

                {user.name} — {user.email}

            </option>

        ))}

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
                                    value={formData.due_date}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                />

                            </div>

                        </div>


                        {/* Buttons */}

                        <div className="flex justify-end gap-3 pt-4">

                            <button
                                type="button"
                                onClick={() => navigate("/tasks")}
                                className="px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading
                                    ? "Creating..."
                                    : "Create Task"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default CreateTask;