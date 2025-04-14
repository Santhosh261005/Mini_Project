const User = require("../models/User");
const Donation = require("../models/Donation");

const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch total donations count
    const totalDonations = await Donation.countDocuments({ donor: userId });

    // Fetch books and clothes count
    const booksDonated = await Donation.countDocuments({ donor: userId, category: "Books" });
    const clothesDonated = await Donation.countDocuments({ donor: userId, category: "Clothes" });

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

    res.status(201).json({ message: "Donation posted successfully", donation });
  } catch (error) {
    console.error("Error posting donation:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserStats, postDonation };
