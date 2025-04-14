const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // Assuming Admin model represents NGOs
    required: false,
  },
  items: [
    {
      donationType: { type: String, required: true },
      description: { type: String },
      quantity: { type: Number, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
