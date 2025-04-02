const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  ngoLocation: { type: String, required: true },
  childrenCount: { type: Number, required: true },
  middleAgeCount: { type: Number, required: true },
  olderCount: { type: Number, required: true },
  establishmentYear: { type: String, required: true },
  ownerEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Admin", AdminSchema);
