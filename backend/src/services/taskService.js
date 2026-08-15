const db = require("../config/db");

const createTask = async ({
    title,
    description,
    status,
    priority,
    assigned_to,
    created_by,
    due_date
}) => {

    const [result] = await db.execute(
        `INSERT INTO tasks
        (
            title,
            description,
            status,
            priority,
            assigned_to,
            created_by,
            due_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            title,
            description || null,
            status,
            priority,
            assigned_to || null,
            created_by,
            due_date || null
        ]
    );

    return result.insertId;
};


const findTaskById = async (id) => {

    const [rows] = await db.execute(
        `SELECT
            t.id,
            t.title,
            t.description,
            t.status,
            t.priority,
            t.assigned_to,
            t.created_by,
            t.due_date,
            t.created_at,
            t.updated_at,

            assigned.name AS assigned_user,
            creator.name AS creator_name

        FROM tasks t

        LEFT JOIN users assigned
            ON t.assigned_to = assigned.id

        INNER JOIN users creator
            ON t.created_by = creator.id

        WHERE t.id = ?`,
        [id]
    );

    return rows[0];
};


const updateTask = async (id, fields) => {

    const allowedFields = [
        "title",
        "description",
        "status",
        "priority",
        "assigned_to",
        "due_date"
    ];

    const updates = [];
    const values = [];

    for (const field of allowedFields) {

        if (fields[field] !== undefined) {

            updates.push(`${field} = ?`);

            values.push(
                fields[field] === ""
                    ? null
                    : fields[field]
            );
        }
    }

    if (updates.length === 0) {
        return false;
    }

    values.push(id);

    const [result] = await db.execute(
        `UPDATE tasks
         SET ${updates.join(", ")}
         WHERE id = ?`,
        values
    );

    return result.affectedRows > 0;
};


const deleteTask = async (id) => {

    const [result] = await db.execute(
        `DELETE FROM tasks
         WHERE id = ?`,
        [id]
    );

    return result.affectedRows > 0;
};


const getTasks = async ({
    search,
    status,
    priority,
    assignee,
    page = 1,
    limit = 10,
    sortBy = "created_at",
    sortOrder = "DESC"
}) => {

    const conditions = [];
    const values = [];

    // =========================
    // SEARCH
    // =========================

    if (search) {
        conditions.push(
            `(t.title LIKE ? OR t.description LIKE ?)`
        );

        values.push(
            `%${search}%`,
            `%${search}%`
        );
    }


    // =========================
    // STATUS
    // =========================

    if (status) {
        conditions.push(`t.status = ?`);
        values.push(status);
    }


    // =========================
    // PRIORITY
    // =========================

    if (priority) {
        conditions.push(`t.priority = ?`);
        values.push(priority);
    }


    // =========================
    // ASSIGNEE
    // =========================

    if (assignee) {
        conditions.push(`t.assigned_to = ?`);
        values.push(Number(assignee));
    }


    // =========================
    // WHERE
    // =========================

    const whereClause =
        conditions.length > 0
            ? `WHERE ${conditions.join(" AND ")}`
            : "";


    // =========================
    // SORTING
    // =========================

    const allowedSortColumns = [
        "created_at",
        "updated_at",
        "due_date",
        "title",
        "priority",
        "status"
    ];

    const safeSortBy =
        allowedSortColumns.includes(sortBy)
            ? sortBy
            : "created_at";


    const safeSortOrder =
        String(sortOrder).toUpperCase() === "ASC"
            ? "ASC"
            : "DESC";


    // =========================
    // PAGINATION
    // =========================

    const safePage = Math.max(
        Number.parseInt(page, 10) || 1,
        1
    );

    const safeLimit = Math.min(
        Math.max(
            Number.parseInt(limit, 10) || 10,
            1
        ),
        100
    );

    const offset = (safePage - 1) * safeLimit;


    // =========================
    // COUNT
    // =========================

    const countSql = `
        SELECT COUNT(*) AS total
        FROM tasks t
        ${whereClause}
    `;

    const [countRows] = await db.execute(
        countSql,
        values
    );

    const total = Number(countRows[0].total);


    // =========================
    // GET TASKS
    // =========================

    const taskSql = `
        SELECT
            t.id,
            t.title,
            t.description,
            t.status,
            t.priority,
            t.assigned_to,
            t.created_by,
            t.due_date,
            t.created_at,
            t.updated_at,

            assigned.name AS assigned_user,
            creator.name AS creator_name

        FROM tasks t

        LEFT JOIN users assigned
            ON t.assigned_to = assigned.id

        INNER JOIN users creator
            ON t.created_by = creator.id

        ${whereClause}

        ORDER BY t.${safeSortBy} ${safeSortOrder}

        LIMIT ${safeLimit}
        OFFSET ${offset}
    `;


    const [tasks] = await db.execute(
        taskSql,
        values
    );


    return {
        tasks,
        total,
        page: safePage,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit)
    };
};


module.exports = {
    createTask,
    findTaskById,
    updateTask,
    deleteTask,
    getTasks
};