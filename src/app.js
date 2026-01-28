const express = require("express");
const cors = require("cors");

const app = express();

//middlewares

app.use(cors());
app.use(express.json());

//test route
app.get("/", (req, res) => {
    res.send("Employee Management System Backend is running");
});

module.exports = app;