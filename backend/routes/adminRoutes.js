const express = require("express");
const router = express.Router();
const { adminSignup, adminLogin } = require("../controllers/adminController");

// Admin Signup Route
router.post("/signup", adminSignup);

// Admin Login Route
router.post("/login", adminLogin);

module.exports = router;
