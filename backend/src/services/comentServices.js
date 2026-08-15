const db = require("../config/db");


// GET COMMENTS FOR TASK
const getCommentsByTaskId = async (taskId) => {

    const [rows] = await db.execute(
        `
        SELECT
            c.id,
            c.task_id,
            c.user_id,
            c.comment,
            c.created_at,
            c.updated_at,
            u.name AS user_name
        FROM comments c
        INNER JOIN users u
            ON c.user_id = u.id
        WHERE c.task_id = ?
        ORDER BY c.created_at ASC
        `,
        [taskId]
    );

    return rows;
};


// CREATE COMMENT
const createComment = async ({
    taskId,
    userId,
    comment
}) => {

    const [result] = await db.execute(
        `
        INSERT INTO comments
        (task_id, user_id, comment)
        VALUES (?, ?, ?)
        `,
        [
            taskId,
            userId,
            comment
        ]
    );

    return result.insertId;
};


// GET COMMENT
const getCommentById = async (id) => {

    const [rows] = await db.execute(
        `
        SELECT *
        FROM comments
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
};


// UPDATE COMMENT
const updateComment = async (
    id,
    comment
) => {

    const [result] = await db.execute(
        `
        UPDATE comments
        SET comment = ?
        WHERE id = ?
        `,
        [
            comment,
            id
        ]
    );

    return result.affectedRows > 0;
};


// DELETE COMMENT
const deleteComment = async (id) => {

    const [result] = await db.execute(
        `
        DELETE FROM comments
        WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows > 0;
};


module.exports = {
    getCommentsByTaskId,
    createComment,
    getCommentById,
    updateComment,
    deleteComment
};