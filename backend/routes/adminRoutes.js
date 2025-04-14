const express = require("express");
const adminController = require("../controllers/adminController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// Admin authentication routes
router.post("/signup", adminController.adminSignup);
router.post("/login", adminController.adminLogin);

// Orphanage details routes (protected)
router.get("/orphanage", protect, adminController.getOrphanageDetails);
router.put("/orphanage", protect, adminController.updateOrphanageDetails);

module.exports = router;
