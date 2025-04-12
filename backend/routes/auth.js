const express = require("express");
const { Signup, Login } = require("../controllers/authController");

const router = express.Router();

// User/Admin Signup
router.post("/Signup", Signup);

// User/Admin Login
router.post("/Login", Login);  

module.exports = router;
