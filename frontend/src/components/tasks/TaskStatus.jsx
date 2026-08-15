function TaskStatus({ status }) {

    const styles = {

        pending:
            "bg-yellow-100 text-yellow-700",

        in_progress:
            "bg-blue-100 text-blue-700",

        completed:
            "bg-green-100 text-green-700",

        blocked:
            "bg-red-100 text-red-700"

    };


    const labels = {

        pending: "Pending",

        in_progress: "In Progress",

        completed: "Completed",

        blocked: "Blocked"

    };


    return (

        <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                styles[status] ||
                "bg-slate-100 text-slate-600"
            }`}
        >

            {labels[status] || status}

        </span>

    );
}


export default TaskStatus;