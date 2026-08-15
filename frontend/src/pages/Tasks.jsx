// import { deleteTask } from "../services/taskService";

import {
    useEffect,
    useState
} from "react";

import {
    Plus,
    RefreshCw
} from "lucide-react";

import {
    Link
} from "react-router-dom";

import TaskFilters from "../components/tasks/TaskFilters";

import TaskTable from "../components/tasks/TaskTable";

import Pagination from "../components/common/Pagination";

import {
    getTasks,
    deleteTask
} from "../services/taskService";


function Tasks() {

    const [tasks, setTasks] =
        useState([]);

    const [users, setUsers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [filters, setFilters] =
        useState({

            search: "",

            status: "",

            priority: "",

            assignee: "",

            sortBy: "created_at",

            sortOrder: "DESC",

            page: 1,

            limit: 10

        });

    const [pagination, setPagination] =
        useState({

            page: 1,

            limit: 10,

            total: 0,

            totalPages: 1

        });


    // ---------------------------------
    // Load tasks
    // ---------------------------------

    const loadTasks = async () => {

        try {

            setLoading(true);

            setError("");


            const params = {

                page: filters.page,

                limit: filters.limit,

                sortBy: filters.sortBy,

                sortOrder: filters.sortOrder

            };


            if (filters.search) {
                params.search =
                    filters.search;
            }


            if (filters.status) {
                params.status =
                    filters.status;
            }


            if (filters.priority) {
                params.priority =
                    filters.priority;
            }


            if (filters.assignee) {
                params.assignee =
                    filters.assignee;
            }


            console.log(
                "Task API params:",
                params
            );


            const response =
                await getTasks(params);


            console.log(
                "Tasks response:",
                response
            );


        
                
          setTasks(
            response.data || []
        );
            
            


            const paginationData =
                response?.data?.pagination ||
                response?.pagination;


            if (paginationData) {

                setPagination(
                    paginationData
                );

            }

        } catch (err) {

            console.error(
                "Tasks error:",
                err
            );


            setError(
                err.response?.data?.message ||
                "Unable to load tasks."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadTasks();

    }, [
        filters.search,
        filters.status,
        filters.priority,
        filters.assignee,
        filters.sortBy,
        filters.sortOrder,
        filters.page,
        filters.limit
    ]);


    // ---------------------------------
    // Delete
    // ---------------------------------

    const handleDelete = async (task) => {

        const confirmed =
            window.confirm(
                `Are you sure you want to delete "${task.title}"?`
            );


        if (!confirmed) {
            return;
        }


        try {

            await deleteTask(task.id);


            setTasks((previous) =>
                previous.filter(
                    (item) =>
                        item.id !== task.id
                )
            );


            loadTasks();

        } catch (err) {

            console.error(
                "Delete task error:",
                err
            );


            alert(
                err.response?.data?.message ||
                "Unable to delete task."
            );

        }
    };


    // ---------------------------------
    // Error
    // ---------------------------------

    if (error && !loading) {

        return (

            <div className="min-h-screen bg-slate-50 p-6">

                <div className="mx-auto max-w-7xl">

                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

                        <h2 className="font-semibold text-red-800">
                            Unable to load tasks
                        </h2>

                        <p className="mt-2 text-sm text-red-600">
                            {error}
                        </p>


                        <button
                            onClick={loadTasks}
                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                        >

                            <RefreshCw size={16} />

                            Try again

                        </button>

                    </div>

                </div>

            </div>
        );
    }


    return (

        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

            <div className="mx-auto max-w-7xl">


                {/* Header */}

                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    <div>

                        <h1 className="text-3xl font-bold text-slate-900">
                            Tasks
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage and track your team's tasks.
                        </p>

                    </div>


                    <div className="flex items-center gap-2">

                        <button
                            onClick={loadTasks}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
                        >

                            <RefreshCw size={16} />

                            Refresh

                        </button>


                        <Link
                            to="/tasks/create"
                            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                        >

                            <Plus size={17} />

                            Create Task

                        </Link>

                    </div>

                </div>


                {/* Filters */}

                <TaskFilters
                    filters={filters}
                    setFilters={setFilters}
                    users={users}
                />


                {/* Table */}

                <div className="mt-5">

                    <TaskTable
                        tasks={tasks}
                        loading={loading}
                        onDelete={handleDelete}
                        filters={filters}
                        setFilters={setFilters}
                    />

                </div>


                {/* Pagination */}

                {!loading && tasks.length > 0 && (

                    <div className="mt-5">

                        <Pagination
                            page={
                                pagination.page ||
                                filters.page
                            }
                            totalPages={
                                pagination.totalPages ||
                                1
                            }
                            total={
                                pagination.total ||
                                tasks.length
                            }
                            limit={
                                pagination.limit ||
                                filters.limit
                            }
                            setPage={(page) =>
                                setFilters(
                                    (previous) => ({
                                        ...previous,
                                        page
                                    })
                                )
                            }
                        />

                    </div>

                )}

            </div>

        </div>
    );
}





export default Tasks;