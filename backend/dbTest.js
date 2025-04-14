const mongoose = require('mongoose');
const Requirement = require('./models/Requirement');

// Simple test script to verify database connection
async function testDatabase() {
  console.log('Starting database test...');
  
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mini_project');
    console.log('Successfully connected to MongoDB');

    // Test Requirement model
    console.log('Testing Requirement model...');
    const testReq = new Requirement({
      adminName: 'Test Admin',
      items: [{
        name: 'Test Item',
        quantity: 1,
        priority: 'high'
      }]
    });

    const savedReq = await testReq.save();
    console.log('Successfully saved test requirement:', savedReq);

    // Clean up
    await Requirement.deleteOne({ _id: savedReq._id });
    console.log('Cleaned up test requirement');

    console.log('Database test completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Database test failed:', error);
    process.exit(1);
  }
}

testDatabase();
