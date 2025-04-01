const express = require("express");
const { getUserStats } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/stats", verifyToken, getUserStats);

module.exports = router;
