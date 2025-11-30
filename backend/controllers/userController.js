// Get current user profile
const getProfile = async (req, res) => {
  try {
    res.json({
      message: 'Profile retrieved successfully',
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        createdAt: req.user.createdAt
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Admin only route
const getUsers = async (req, res) => {
  try {
    const User = require('../models/User');
    const users = await User.find().select('-password');
    
    res.json({
      message: 'Users retrieved successfully',
      users
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getProfile, getUsers };