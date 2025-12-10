// Quick script to set up user roles
// Run with: node setup-roles.js

const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./backend/models/User');

async function setupRoles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@city.gov' });
    if (!adminExists) {
      await User.create({
        name: 'City Administrator',
        email: 'admin@city.gov',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Admin user created: admin@city.gov / admin123');
    }

    // Create staff user
    const staffExists = await User.findOne({ email: 'staff@city.gov' });
    if (!staffExists) {
      await User.create({
        name: 'City Staff Member',
        email: 'staff@city.gov', 
        password: 'staff123',
        role: 'staff'
      });
      console.log('✅ Staff user created: staff@city.gov / staff123');
    }

    console.log('\n🎯 Test Accounts:');
    console.log('Admin: admin@city.gov / admin123');
    console.log('Staff: staff@city.gov / staff123');
    console.log('Citizen: (any registered user)');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

setupRoles();