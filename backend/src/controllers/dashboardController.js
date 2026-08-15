const dashboardService =
    require("../services/dashboardService");


const getDashboard = async (req, res, next) => {

    try {

        // Current logged-in user
        const userId = req.user.id;


        const [
            stats,
            recentTasks,
            statusStats,
            priorityStats
        ] = await Promise.all([

            dashboardService
                .getDashboardStats(userId),

            dashboardService
                .getRecentTasks(),

            dashboardService
                .getStatusStats(),

            dashboardService
                .getPriorityStats()

        ]);


        return res.status(200).json({

            success: true,

            data: {

                stats,

                recentTasks,

                statusStats,

                priorityStats

            }

        });

    } catch (error) {

        next(error);

    }
};


module.exports = {
    getDashboard
};