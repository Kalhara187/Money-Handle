// Quick test script to create a test user
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  plan: { type: String, default: 'basic' },
  subscriptionStatus: { type: String, default: 'trial' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function createTestUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const hashedPassword = await bcrypt.hash('password123', 12);

    const testUser = new User({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: hashedPassword,
      plan: 'basic',
      subscriptionStatus: 'trial'
    });

    await testUser.save();
    console.log('Test user created successfully:');
    console.log('Email: test@example.com');
    console.log('Password: password123');

    // Create admin user
    const adminHashedPassword = await bcrypt.hash('admin123', 12);

    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@moneyhandle.com',
      password: adminHashedPassword,
      role: 'admin',
      plan: 'premium',
      subscriptionStatus: 'active'
    });

    await adminUser.save();
    console.log('Admin user created successfully:');
    console.log('Email: admin@moneyhandle.com');
    console.log('Password: admin123');
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
}

createTestUser();