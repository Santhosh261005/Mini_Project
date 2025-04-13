const express = require("express");
const router = express.Router();
const { adminSignup, adminLogin } = require("../controllers/adminController");
const { postRequirements } = require('../controllers/requirementController');

// Admin Signup Route
router.post("/signup", adminSignup);

// Admin Login Route
router.post("/login", adminLogin);


router.post('/post', postRequirements); // or use `protect` if needed

module.exports = router;
