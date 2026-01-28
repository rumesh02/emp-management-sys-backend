const express = require("express");
const { registerUser } = require("../controllers/userController");

const router = express.Router();

//register user
router.post("/register", registerUser);

module.exports = router;