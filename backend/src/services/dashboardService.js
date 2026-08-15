const db = require("../config/db");


// Get dashboard statistics
const getDashboardStats = async (userId) => {

    // Total tasks
    const [totalRows] = await db.execute(`
        SELECT COUNT(*) AS total
        FROM tasks
    `);


    // Pending
    const [pendingRows] = await db.execute(`
        SELECT COUNT(*) AS total
        FROM tasks
        WHERE status = 'pending'
    `);


    // In Progress
    const [inProgressRows] = await db.execute(`
        SELECT COUNT(*) AS total
        FROM tasks
        WHERE status = 'in_progress'
    `);


    // Completed
    const [completedRows] = await db.execute(`
        SELECT COUNT(*) AS total
        FROM tasks
        WHERE status = 'completed'
    `);


    // Blocked
    const [blockedRows] = await db.execute(`
        SELECT COUNT(*) AS total
        FROM tasks
        WHERE status = 'blocked'
    `);


    // Overdue
    // Due date has passed and task is not completed
    const [overdueRows] = await db.execute(`
        SELECT COUNT(*) AS total
        FROM tasks
        WHERE due_date < NOW()
        AND status != 'completed'
    `);


    // Tasks assigned to current user
    const [myTasksRows] = await db.execute(
        `
        SELECT COUNT(*) AS total
        FROM tasks
        WHERE assigned_to = ?
        `,
        [userId]
    );


    return {
        totalTasks: totalRows[0].total,
        pendingTasks: pendingRows[0].total,
        inProgressTasks: inProgressRows[0].total,
        completedTasks: completedRows[0].total,
        blockedTasks: blockedRows[0].total,
        overdueTasks: overdueRows[0].total,
        myTasks: myTasksRows[0].total
    };
};


// Recent tasks
const getRecentTasks = async () => {

    const [rows] = await db.execute(`
        SELECT
            t.id,
            t.title,
            t.status,
            t.priority,
            t.due_date,
            t.created_at,
            t.updated_at,
            u.name AS assigned_user

        FROM tasks t

        LEFT JOIN users u
            ON t.assigned_to = u.id

        ORDER BY t.created_at DESC

        LIMIT 5
    `);

    return rows;
};


// Status statistics
const getStatusStats = async () => {

    const [rows] = await db.execute(`
        SELECT
            status,
            COUNT(*) AS total
        FROM tasks
        GROUP BY status
    `);

    return rows;
};


// Priority statistics
const getPriorityStats = async () => {

    const [rows] = await db.execute(`
        SELECT
            priority,
            COUNT(*) AS total
        FROM tasks
        GROUP BY priority
    `);

    return rows;
};


module.exports = {
    getDashboardStats,
    getRecentTasks,
    getStatusStats,
    getPriorityStats
};