const express = require("express");
const cors = require("cors");

const authRoutes =
    require("./routes/authRoutes");

const taskRoutes =
    require("./routes/taskRoutes");

const userRoutes =
    require("./routes/userRoutes");

const commentRoutes =
    require("./routes/commentRoutes");

const dashboardRoutes =
    require("./routes/dashboardRoutes");


const app = express();


app.use(cors());

app.use(express.json());



app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Task Management API is running"
    });

});


app.get("/api/health", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Server and API are working"
    });

});


app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/users", userRoutes);

app.use("/api", commentRoutes);

app.use("/api/dashboard", dashboardRoutes);


module.exports = app;