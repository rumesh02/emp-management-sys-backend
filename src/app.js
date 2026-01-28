const express = require("express");
const cors = require("cors");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/users", require("./routes/userRoutes"));

//test route
app.get("/", (req, res) => {
    res.send("Employee Management System Backend is running");
});

module.exports = app;