const express = require("express");
const { Signup, Login } = require("../controllers/authController");

const router = express.Router();

// User/Admin Signup
router.post("/signup", Signup);

// User/Admin Login
router.post("/login", Login);

module.exports = router;