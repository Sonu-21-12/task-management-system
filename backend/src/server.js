require("dotenv").config();

const app = require("./app");
const db = require("./config/db");



const startServer = async () => {
    try {

        const connection = await db.getConnection();

        console.log("MySQL database connected successfully");

        connection.release();

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

    } catch (error) {

        console.error("Database connection failed:");
        console.error(error.message);

        process.exit(1);
    }
};

startServer();