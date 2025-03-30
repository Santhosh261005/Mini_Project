const express = require("express");
const { Signup, Login } = require("../controllers/authController");

const router = express.Router();

// User/Admin Signup
router.post("/Signup", Signup);  // ✅ Updated to match frontend name

// User/Admin Login
router.post("/Login", Login);  // ✅ Updated to match frontend name

module.exports = router;
