const mongoose = require('mongoose');
const Requirement = require('./models/Requirement');

async function testRequirementModel() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mini_project');
    console.log('Connected to MongoDB');

    // Test creating a requirement
    const testReq = new Requirement({
      adminName: 'Test Admin',
      items: [{
        name: 'Test Item',
        quantity: 5,
        priority: 'high',
        notes: 'Test notes'
      }]
    });

    const savedReq = await testReq.save();
    console.log('Successfully saved test requirement:', savedReq);

    // Clean up
    await Requirement.deleteOne({ _id: savedReq._id });
    console.log('Cleaned up test requirement');

    process.exit(0);
  } catch (error) {
    console.error('Error testing Requirement model:', error);
    process.exit(1);
  }
}

testRequirementModel();
