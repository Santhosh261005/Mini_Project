const User = require("../models/User");
const Donation = require("../models/Donation");

const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch total donations count
    const totalDonations = await Donation.countDocuments({ donor: userId });

    // Fetch books and clothes count
    const booksDonated = await Donation.countDocuments({ donor: userId, "items.donationType": "books" });
    const clothesDonated = await Donation.countDocuments({ donor: userId, "items.donationType": "clothes" });

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
    const donorId = req.user.id;
    const { ngoId, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Donation items are required" });
    }

    const donation = new Donation({
      donor: donorId,
      ngo: ngoId || null,
      items,
    });

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

    res.status(201).json({ message: "Donation posted successfully", donation });
  } catch (error) {
    console.error("Error posting donation:", error);
    res.status(500).json({ message: "Server error" });
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