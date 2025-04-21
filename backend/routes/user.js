const express = require("express");
const { postDonation, getUserStats, getUserRewards, getLeaderboard } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Route to post a donation
router.post("/donations", authMiddleware, postDonation);

// Route to get user stats
router.get("/stats", authMiddleware, getUserStats);

// Route to get user rewards
router.get("/rewards", authMiddleware, getUserRewards);

// Route to get leaderboard
router.get("/leaderboard", getLeaderboard);

module.exports = router;
