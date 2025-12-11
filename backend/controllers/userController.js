const User = require('../models/User');

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

// Admin only - get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.json({
      message: 'Users retrieved successfully',
      users
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Admin only - create staff user
const createStaff = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const staff = await User.create({ 
      name, 
      email, 
      password, 
      role: 'staff' 
    });

    res.status(201).json({
      message: 'Staff member created successfully',
      user: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Admin only - update user role
const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['citizen', 'staff'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      userId, 
      { role }, 
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User role updated successfully',
      user
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getProfile, getUsers, createStaff, updateUserRole };