const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.Signup = async (req, res) => {
    try {
        console.log("Incoming signup request:", req.body); // 👈 Add this

        const { fullName, rollNumber, contactNumber, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            console.log("User already exists:", email); // 👈
            return res.status(400).json({ msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            fullName,
            rollNumber,
            contactNumber,
            email,
            password: hashedPassword,
        });

        await user.save();
        console.log("User registered:", user.email); // 👈

        res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

// User Login (Matching Frontend Page Name)
exports.Login = async (req, res) => {
    try {
        console.log('Login request received:', { email: req.body.email });
        const { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        console.log('User lookup result:', user ? 'Found' : 'Not found');
        if (!user) {
            console.log('Login failed: User not found');
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password comparison result:', isMatch);
        if (!isMatch) {
            console.log('Login failed: Password mismatch');
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate JWT Token
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};
