const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const { protect, adminOnly, employeeOnly } = require("../middleware/authMiddleware");

const router = express.Router();

//register user
router.post("/register", registerUser);
router.post("/login", loginUser);

//protect routes
router.get("/profile", protect, (req, res) => {
    res.status(200).json({
        message: "Profile accessed successfully",
        user: req.user
    });
});

//admin only route
router.get("/admin/dashboard", protect, adminOnly, (req, res) => {
    res.status(200).json({
        message: "Admin dashboard accessed successfully",
        user: req.user
    });
});

//employee only route
router.get("/employee/dashboard", protect, employeeOnly, (req, res) => {
    res.status(200).json({
        message: "Employee dashboard accessed successfully",
        user: req.user
    });
});

module.exports = router;