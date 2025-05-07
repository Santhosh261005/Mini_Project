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
  // New fields for orphanage details
  orphanageName: { type: String },
  address: { type: String },
  phone: { type: String },

  email: { type: String },
  website: { type: String },
  staffCount: { type: String },
  director: { type: String },
  mission: { type: String },
  needs: { type: String },
  accreditation: { type: String },
  images: [{ type: String }],
  requirements: [{ // New field for storing requirements
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    priority: { type: String, default: 'medium' },
    notes: { type: String, default: '' }
  }]
}, { timestamps: true });

module.exports = mongoose.model("Admin", AdminSchema);