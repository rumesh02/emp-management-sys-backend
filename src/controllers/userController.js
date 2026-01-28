const User = require("../models/User");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role} = req.body;

        //basic validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please enter all required fields"
            });
        }

        //check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists"
            });
        }

        //create new user
        const user = await User.create({
            name,
            email,
            password,
            role
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    registerUser
};