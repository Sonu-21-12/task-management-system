import { useEffect, useState } from "react";

import {
    CheckSquare,
    Clock,
    CircleCheck,
    AlertTriangle,
    ListTodo,
    UserCheck,
    RefreshCw
} from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import TaskChart from "../components/dashboard/TaskChart";
import RecentTasks from "../components/dashboard/RecentTasks";

import {
    getDashboardData
} from "../services/dashboardService";


function Dashboard() {

    const [dashboard, setDashboard] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");


            const response =
                await getDashboardData();


            console.log(
                "Dashboard response:",
                response
            );


            setDashboard(
                response?.data || response
            );


        } catch (err) {

            console.error(
                "Dashboard error:",
                err
            );


            const message =
                err.response?.data?.message ||
                "Unable to load dashboard.";


            setError(message);


        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadDashboard();

    }, []);


    if (loading) {

        return (

            <div className="min-h-screen bg-slate-50 p-6">

                <div className="mx-auto max-w-7xl">

                    <div className="flex min-h-[60vh] items-center justify-center">

                        <div className="text-center">

                            <RefreshCw
                                size={32}
                                className="mx-auto animate-spin text-slate-700"
                            />

                            <p className="mt-4 text-sm text-slate-500">
                                Loading dashboard...
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        );
    }


    if (error) {

        return (

            <div className="min-h-screen bg-slate-50 p-6">

                <div className="mx-auto max-w-7xl">

                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

                        <h2 className="font-semibold text-red-800">
                            Unable to load dashboard
                        </h2>

                        <p className="mt-2 text-sm text-red-600">
                            {error}
                        </p>


                        <button
                            onClick={loadDashboard}
                            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                        >
                            Try again
                        </button>

                    </div>

                </div>

            </div>
        );
    }


    const stats = dashboard?.stats || dashboard || {};


    return (

        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

            <div className="mx-auto max-w-7xl">


                {/* Header */}

                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    <div>

                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Dashboard
                        </h1>

                        <p className="mt-1 text-slate-500">
                            Here's an overview of your team's work.
                        </p>

                    </div>


                    <button
                        onClick={loadDashboard}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                    >

                        <RefreshCw size={16} />

                        Refresh

                    </button>

                </div>


                {/* Statistics */}

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">


                    <StatCard
                        title="Total Tasks"
                        value={stats.totalTasks ?? 0}
                        description="All tasks in the system"
                        icon={
                            <ListTodo size={22} />
                        }
                    />


                    <StatCard
                        title="Pending"
                        value={stats.pendingTasks ?? 0}
                        description="Tasks waiting to start"
                        icon={
                            <Clock size={22} />
                        }
                        iconClassName="bg-yellow-100 text-yellow-700"
                    />


                    <StatCard
                        title="In Progress"
                        value={stats.inProgressTasks ?? 0}
                        description="Currently being worked on"
                        icon={
                            <RefreshCw size={22} />
                        }
                        iconClassName="bg-blue-100 text-blue-700"
                    />


                    <StatCard
                        title="Completed"
                        value={stats.completedTasks ?? 0}
                        description="Successfully completed"
                        icon={
                            <CircleCheck size={22} />
                        }
                        iconClassName="bg-green-100 text-green-700"
                    />


                    <StatCard
                        title="Overdue"
                        value={stats.overdueTasks ?? 0}
                        description="Past their due date"
                        icon={
                            <AlertTriangle size={22} />
                        }
                        iconClassName="bg-red-100 text-red-700"
                    />


                    <StatCard
                        title="My Tasks"
                        value={stats.myTasks ?? 0}
                        description="Assigned to you"
                        icon={
                            <UserCheck size={22} />
                        }
                        iconClassName="bg-purple-100 text-purple-700"
                    />

                </div>


                {/* Charts */}

                <div className="mt-6">

                    <TaskChart
                        data={{
                            pending:
                                stats.pendingTasks,

                            inProgress:
                                stats.inProgressTasks,

                            completed:
                                stats.completedTasks,

                            blocked:
                                stats.blockedTasks
                        }}
                    />

                </div>


                {/* Recent Tasks */}

                <div className="mt-6">

                    <RecentTasks
                        tasks={
                            dashboard?.recentTasks ||
                            []
                        }
                    />

                </div>

            </div>

        </div>
    );
}

export default Dashboard;