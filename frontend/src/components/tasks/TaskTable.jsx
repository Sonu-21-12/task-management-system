import { useNavigate } from "react-router-dom";


function TaskTable({ tasks, onDelete }) {

    const navigate = useNavigate();

    const getStatusClass = (status) => {

        const classes = {
            pending: "bg-yellow-100 text-yellow-700",
            in_progress: "bg-blue-100 text-blue-700",
            completed: "bg-green-100 text-green-700",
            blocked: "bg-red-100 text-red-700"
        };

        return classes[status] ||
            "bg-gray-100 text-gray-700";
    };


    const getPriorityClass = (priority) => {

        const classes = {
            low: "bg-gray-100 text-gray-700",
            medium: "bg-blue-100 text-blue-700",
            high: "bg-orange-100 text-orange-700",
            urgent: "bg-red-100 text-red-700"
        };

        return classes[priority] ||
            "bg-gray-100 text-gray-700";
    };


    if (!tasks || tasks.length === 0) {

        return (
            <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                <p className="text-gray-500">
                    No tasks found.
                </p>
            </div>
        );

    }


    return (

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-50 border-b">

                        <tr>

                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                Task
                            </th>

                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                Assignee
                            </th>

                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                Priority
                            </th>

                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                Status
                            </th>

                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                Due Date
                            </th>

                            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody className="divide-y">

                        {tasks.map((task) => (

                            <tr
                                key={task.id}
                                className="hover:bg-gray-50"
                            >

                                {/* Task */}

                                <td className="px-6 py-4">

                                    <div>

                                        <p className="font-medium text-gray-800">
                                            {task.title}
                                        </p>

                                        {task.description && (

                                            <p className="text-sm text-gray-500 truncate max-w-xs">
                                                {task.description}
                                            </p>

                                        )}

                                    </div>

                                </td>


                                {/* Assignee */}

                                <td className="px-6 py-4">

                                    <span className="text-sm text-gray-700">
                                        {task.assigned_user ||
                                            "Unassigned"}
                                    </span>

                                </td>


                                {/* Priority */}

                                <td className="px-6 py-4">

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityClass(task.priority)}`}
                                    >
                                        {task.priority}
                                    </span>

                                </td>


                                {/* Status */}

                                <td className="px-6 py-4">

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(task.status)}`}
                                    >
                                        {task.status
                                            ?.replace("_", " ")}
                                    </span>

                                </td>


                                {/* Due Date */}

                                <td className="px-6 py-4 text-sm text-gray-600">

                                    {task.due_date
                                        ? new Date(
                                            task.due_date
                                        ).toLocaleDateString()
                                        : "No due date"}

                                </td>


                                {/* Actions */}

                                <td className="px-6 py-4">

                                    <div className="flex justify-end gap-2">

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/tasks/${task.id}`
                                                )
                                            }
                                            className="px-3 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                                        >
                                            View
                                        </button>


                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/tasks/${task.id}/edit`
                                                )
                                            }
                                            className="px-3 py-2 text-sm rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700"
                                        >
                                            Edit
                                        </button>


                                      <button
    onClick={() => {
        console.log("DELETE TASK OBJECT:", task);
        console.log("DELETE TASK ID:", task.id);

        onDelete(task.id);
    }}
    className="px-3 py-2 text-sm rounded-lg bg-red-100 hover:bg-red-200 text-red-700"
>
    Delete
</button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
}



export default TaskTable;