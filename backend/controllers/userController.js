const mongoose = require("mongoose");
const User = require("../models/User");
const Donation = require("../models/Donation");

const getUserStats = async (req, res) => {
  try {
    let userId = req.user.id;
    if (!(userId instanceof mongoose.Types.ObjectId)) {
      userId = mongoose.Types.ObjectId(userId);
    }

    // Fetch total donations count
    const totalDonations = await Donation.countDocuments({ $expr: { $eq: [ "$donor", userId ] } });

    // Aggregate total books donated quantity
    const booksAggregation = await Donation.aggregate([
      { $match: { $expr: { $eq: [ "$donor", userId ] } } },
      { $unwind: "$items" },
      { $match: { "items.donationType": "books" } },
      { $group: { _id: null, totalQuantity: { $sum: "$items.quantity" } } }
    ]);
    const booksDonated = booksAggregation.length > 0 ? booksAggregation[0].totalQuantity : 0;

    // Aggregate total clothes donated quantity
    const clothesAggregation = await Donation.aggregate([
      { $match: { $expr: { $eq: [ "$donor", userId ] } } },
      { $unwind: "$items" },
      { $match: { "items.donationType": "clothes" } },
      { $group: { _id: null, totalQuantity: { $sum: "$items.quantity" } } }
    ]);
    const clothesDonated = clothesAggregation.length > 0 ? clothesAggregation[0].totalQuantity : 0;

    // Fetch user points (assuming there's a points system in User model)
    const user = await User.findById(userId);
    const pointsEarned = user.points || 0;

    // Fetch recent donations
    const recentDonations = await Donation.find({ donor: userId }).sort({ createdAt: -1 }).limit(5);

    res.json({
      booksDonated,
      clothesDonated,
      totalDonations,
      pointsEarned,
      recentDonations,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const postDonation = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }

    const donorId = req.user.id;
    const { ngoId, items } = req.body;

    // Log the incoming request for debugging
    console.log("Request Body:", req.body);
    console.log("Donor ID:", donorId);
    console.log("NGO ID:", ngoId);
    console.log("Items:", items);

    // Validate donation items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Donation items are required" });
    }

    // Determine if the donation is for a specific NGO or general
    const donationData = {
      donor: donorId,
      ngo: ngoId || null, // If ngoId is provided, associate it; otherwise, it's a general donation
      items,
    };

    console.log("Donation Data:", donationData); // Log the donation data for debugging
    const donation = new Donation(donationData); // Create the donation object

    await donation.save();

    // Calculate points earned from donation (sum of quantities)
    const pointsEarned = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

    // Update user points and badge
    const user = await User.findById(donorId);
    if (user) {
      user.points = (user.points || 0) + pointsEarned;

      // Assign badge based on points thresholds
      if (user.points >= 100) {
        user.badge = "Elite";
      } else if (user.points >= 50) {
        user.badge = "Gold";
      } else if (user.points >= 20) {
        user.badge = "Silver";
      } else {
        user.badge = "None";
      }

      await user.save();
    }

    // Respond with success message and donation details
    res.status(201).json({
      message: ngoId
        ? `Donation posted successfully to NGO with ID: ${ngoId}`
        : "General donation posted successfully",
      donation,
    });
  } catch (error) {
    console.error("Error posting donation:", error.message);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

// New controller to get leaderboard (top users by points)
const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find({})
      .sort({ points: -1 })
      .limit(10)
      .select("fullName points badge");

    res.json(topUsers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// New controller to get current user's rewards info
const getUserRewards = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("points badge");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ points: user.points, badge: user.badge });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserStats, postDonation, getLeaderboard, getUserRewards };
