const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema({
  adminName: {  // Store admin's name
    type: String,
    required: true,
  },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, default: 0 },
      priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
      notes: { type: String, default: '' }
    }
  ],
  postedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Requirement', requirementSchema);
