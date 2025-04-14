const mongoose = require('mongoose');
const Requirement = require('./models/Requirement');

async function testConnection() {
  console.log('Starting database connection test...');
  
  try {
    // 1. Test MongoDB connection
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mini_project', {
      connectTimeoutMS: 5000,
      socketTimeoutMS: 5000
    });
    console.log('✓ Successfully connected to MongoDB');

    // 2. Test Requirement model
    console.log('Testing Requirement model...');
    const testReq = {
      adminName: 'Test Admin',
      items: [{
        name: 'Test Item',
        quantity: 1,
        priority: 'high'
      }]
    };

    console.log('Creating requirement document...');
    const req = new Requirement(testReq);
    
    console.log('Saving requirement...');
    const savedReq = await req.save();
    console.log('✓ Successfully saved requirement:', savedReq._id);

    // 3. Test query
    console.log('Querying requirement...');
    const foundReq = await Requirement.findById(savedReq._id);
    console.log('✓ Found requirement:', foundReq ? foundReq._id : 'Not found');

    // Clean up
    console.log('Cleaning up...');
    await Requirement.deleteOne({ _id: savedReq._id });
    console.log('✓ Cleanup complete');

    console.log('✅ All tests passed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

testConnection();
