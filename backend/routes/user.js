const express = require("express");
const { postDonation } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Route to post a donation
router.post("/donations", authMiddleware, postDonation);

module.exports = router;
