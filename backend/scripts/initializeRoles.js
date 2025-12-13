const mongoose = require('mongoose');
const RoleService = require('../services/roleService');
require('dotenv').config();

async function initializeRoles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await RoleService.initializeDefaultRoles();
    console.log('✅ Default roles initialized successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing roles:', error);
    process.exit(1);
  }
}

initializeRoles();