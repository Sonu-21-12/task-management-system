import { Link } from "react-router-dom";


function getStatusClass(status) {

    switch (status) {

        case "completed":
            return "bg-green-100 text-green-700";

        case "in_progress":
            return "bg-blue-100 text-blue-700";

        case "blocked":
            return "bg-red-100 text-red-700";

        default:
            return "bg-yellow-100 text-yellow-700";
    }
}


function getPriorityClass(priority) {

    switch (priority) {

        case "urgent":
            return "bg-red-100 text-red-700";

        case "high":
            return "bg-orange-100 text-orange-700";

        case "medium":
            return "bg-yellow-100 text-yellow-700";

        default:
            return "bg-slate-100 text-slate-600";
    }
}


function RecentTasks({ tasks = [] }) {

    return (

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-200 p-6">

                <div>

                    <h2 className="text-lg font-bold text-slate-900">
                        Recent Tasks
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Latest team activity
                    </p>

                </div>


                <Link
                    to="/tasks"
                    className="text-sm font-semibold text-slate-900 hover:underline"
                >
                    View all
                </Link>

            </div>


            {tasks.length === 0 ? (

                <div className="p-8 text-center">

                    <p className="text-sm text-slate-500">
                        No tasks found.
                    </p>

                </div>

            ) : (

                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead>

                            <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">

                                <th className="px-6 py-4">
                                    Task
                                </th>

                                <th className="px-6 py-4">
                                    Priority
                                </th>

                                <th className="px-6 py-4">
                                    Status
                                </th>

                                <th className="px-6 py-4">
                                    Due Date
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {tasks.map((task) => (

                                <tr
                                    key={task.id}
                                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                >

                                    <td className="px-6 py-4">

                                        <Link
                                            to={`/tasks/${task.id}`}
                                            className="font-medium text-slate-900 hover:underline"
                                        >
                                            {task.title}
                                        </Link>

                                    </td>


                                    <td className="px-6 py-4">

                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getPriorityClass(task.priority)}`}
                                        >
                                            {task.priority}
                                        </span>

                                    </td>


                                    <td className="px-6 py-4">

                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(task.status)}`}
                                        >
                                            {task.status}
                                        </span>

                                    </td>


                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {task.due_date || "—"}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}

export default RecentTasks;