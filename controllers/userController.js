const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Notification = require('../models/Notification');
const sendNotification = global.sendNotification;


// Register User
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body; // role can be 'student' or 'admin'
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'student' // Default role is 'student'
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
};

// Login User and Issue JWT Token
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        const message = "You logged in";
        const notification = new Notification({ user: user._id, message });
        await notification.save();

        // Send notification after a short delay
        setTimeout(() => {
            sendNotification(user._id.toString(), message);
        }, 1000); // 1-second delay

        // Set token in HTTP-Only Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.json({ message: "Login successful", token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Logout User
exports.logoutUser = (req, res) => {
    res.clearCookie('token');
    res.json({ message: "Logout successful" });
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ _id:req.user.id });
        console.log("user",user)
        res.json(user);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
     // Return user info from token
};


