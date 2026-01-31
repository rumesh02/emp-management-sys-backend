const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    //check if authorization header exists
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            //extract token
            token = req.headers.authorization.split(" ")[1];

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            //get user from DB (excluding password)
            req.user = await User.findById(decoded.id).select("-password");

            next(); //allow request to continue
        } catch (error) {
            return res.status(401).json({
                message: "Not authorized, token failed"
            });
        }
    }

    //if no token found
    if (!token) {
        return res.status(401).json({
            message: "Not authorized, no token"
        });
    }
};


//admin only
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin"){
        next();
    } else {
        return res.status(403).json({
            message: "Not authorized as an admin"
        });
    }
};

//employee only
const employeeOnly = (req, res, next) => {
    if (req.user && req.user.role === "employee"){
        next();
    } else {
        return res.status(403).json({
            message: "Not authorized as an employee"
        });
    }
};

module.exports = { protect, adminOnly, employeeOnly };