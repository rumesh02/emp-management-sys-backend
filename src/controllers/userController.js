const User = require("../models/User");
const jwt = require("jsonwebtoken");


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        //find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        //check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        //generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.JWT_EXPIRE
            }
        );

        //send response
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};



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

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: User._id,
            name: User.name,
            email: User.email,
            role: User.role
        }
    });

};



module.exports = {
    registerUser,
    loginUser
};