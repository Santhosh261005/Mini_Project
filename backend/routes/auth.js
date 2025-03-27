const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// User/Admin Signup
router.post("/register", registerUser);

// User/Admin Login
router.post("/login", loginUser);

module.exports = router;
