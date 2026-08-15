import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function TaskChart({ data }) {

    const chartData = [
        {
            name: "Pending",
            tasks: Number(data?.pending || 0)
        },
        {
            name: "In Progress",
            tasks: Number(data?.inProgress || 0)
        },
        {
            name: "Completed",
            tasks: Number(data?.completed || 0)
        },
        {
            name: "Blocked",
            tasks: Number(data?.blocked || 0)
        }
    ];


    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6">

                <h2 className="text-lg font-bold text-slate-900">
                    Task Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Current task status distribution
                </p>

            </div>


            <div className="h-72">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -20,
                            bottom: 5
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="name"
                        />

                        <YAxis
                            allowDecimals={false}
                        />

                        <Tooltip />

                        <Bar
                            dataKey="tasks"
                            radius={[6, 6, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default TaskChart;