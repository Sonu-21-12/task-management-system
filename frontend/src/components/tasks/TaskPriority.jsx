function TaskPriority({ priority }) {

    const styles = {

        low:
            "bg-slate-100 text-slate-600",

        medium:
            "bg-yellow-100 text-yellow-700",

        high:
            "bg-orange-100 text-orange-700",

        urgent:
            "bg-red-100 text-red-700"

    };


    return (

        <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                styles[priority] ||
                "bg-slate-100 text-slate-600"
            }`}
        >

            {priority
                ? priority.charAt(0).toUpperCase() +
                  priority.slice(1)
                : "—"}

        </span>

    );
}


export default TaskPriority;