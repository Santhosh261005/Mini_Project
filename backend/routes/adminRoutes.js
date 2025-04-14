const express = require("express");
const adminController = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuthMiddleware");

const router = express.Router();

// Admin authentication routes
router.post("/signup", adminController.adminSignup);
router.post("/login", adminController.adminLogin);

// Orphanage details routes (protected)
router.get("/orphanage", adminAuth, adminController.getOrphanageDetails);
router.put("/orphanage", adminAuth, adminController.updateOrphanageDetails);

// Temporary test route (remove after debugging)
router.post("/test-post", adminController.postRequirements); // Test route without auth
router.post("/post", adminAuth, adminController.postRequirements); // Original route

module.exports = router;
