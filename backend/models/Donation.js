const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ngo: { type: mongoose.Schema.Types.ObjectId, ref: "NGO", default: null }, // Allow null for general donations
  items: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
