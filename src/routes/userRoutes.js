const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

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

module.exports = router;