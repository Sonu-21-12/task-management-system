import {
    Search,
    X
} from "lucide-react";


function TaskFilters({
    filters,
    setFilters,
    users = []
}) {

    const updateFilter = (name, value) => {

        setFilters((previous) => ({
            ...previous,
            [name]: value,
            page: 1
        }));

    };


    const clearFilters = () => {

        setFilters({
            search: "",
            status: "",
            priority: "",
            assignee: "",
            sortBy: "created_at",
            sortOrder: "DESC",
            page: 1,
            limit: 10
        });

    };


    const hasFilters =
        filters.search ||
        filters.status ||
        filters.priority ||
        filters.assignee;


    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <div className="grid gap-3 lg:grid-cols-5">


                {/* Search */}

                <div className="relative lg:col-span-2">

                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) =>
                            updateFilter(
                                "search",
                                e.target.value
                            )
                        }
                        placeholder="Search tasks..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                    />

                </div>


                {/* Status */}

                <select
                    value={filters.status}
                    onChange={(e) =>
                        updateFilter(
                            "status",
                            e.target.value
                        )
                    }
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                >

                    <option value="">
                        All Statuses
                    </option>

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


                {/* Priority */}

                <select
                    value={filters.priority}
                    onChange={(e) =>
                        updateFilter(
                            "priority",
                            e.target.value
                        )
                    }
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                >

                    <option value="">
                        All Priorities
                    </option>

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


                {/* Assignee */}

                <select
                    value={filters.assignee}
                    onChange={(e) =>
                        updateFilter(
                            "assignee",
                            e.target.value
                        )
                    }
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
                >

                    <option value="">
                        All Assignees
                    </option>

                    {users.map((user) => (

                        <option
                            key={user.id}
                            value={user.id}
                        >
                            {user.name}
                        </option>

                    ))}

                </select>

            </div>


            {/* Active filters */}

            {hasFilters && (

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">

                    <p className="text-xs text-slate-500">
                        Filters are applied automatically.
                    </p>

                    <button
                        onClick={clearFilters}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
                    >

                        <X size={15} />

                        Clear filters

                    </button>

                </div>

            )}

        </div>
    );
}


export default TaskFilters;