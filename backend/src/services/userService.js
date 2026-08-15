const db = require("../config/db");

const getUsers = async () => {
    const [rows] = await db.execute(`
        SELECT
            id,
            name,
            email,
            role,
            created_at
        FROM users
        ORDER BY created_at DESC
    `);

    return rows;
};

const getUserById = async (id) => {
    const [rows] = await db.execute(
        `
        SELECT
            id,
            name,
            email,
            role,
            created_at
        FROM users
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
};

const createUser = async ({
    name,
    email,
    password,
    role
}) => {
    const [result] = await db.execute(
        `
        INSERT INTO users
        (name, email, password, role)
        VALUES (?, ?, ?, ?)
        `,
        [name, email, password, role]
    );

    return result.insertId;
}

const getUserByEmail = async (email) => {
    const [rows] = await db.execute(
        `
        SELECT id, name, email, role
        FROM users
        WHERE email = ?
        `,
        [email]
    );

    return rows[0];
};

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser
};