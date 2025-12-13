const jwt = require('jsonwebtoken');
const User = require('../models/User');
const RoleService = require('../services/roleService');
const SessionService = require('../services/sessionService');

// Register User
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Get role object
    const roleObj = await RoleService.getRoleByName(role || 'citizen');
    if (!roleObj) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    // Create user
    const user = await User.create({ 
      name, 
      email, 
      password, 
      role: roleObj._id,
      legacyRole: role || 'citizen'
    });
    
    // Create session
    const deviceInfo = SessionService.parseDeviceInfo(req);
    const { accessToken, refreshToken } = await SessionService.createSession(user._id, deviceInfo);

    res.status(201).json({
      message: 'User registered successfully',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: roleObj.name,
        roleId: roleObj._id
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and populate role
    const user = await User.findOne({ email, isActive: true }).populate('role');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({ message: 'Account temporarily locked due to too many failed attempts' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      await user.incLoginAttempts();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Reset login attempts on successful login
    await user.resetLoginAttempts();

    // Create session
    const deviceInfo = SessionService.parseDeviceInfo(req);
    const { accessToken, refreshToken } = await SessionService.createSession(user._id, deviceInfo);

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role.name,
        roleId: user.role._id,
        permissions: user.role.permissions
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Refresh Token
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    const { accessToken, user } = await SessionService.refreshAccessToken(refreshToken);
    
    res.json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.legacyRole
      }
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (refreshToken) {
      await SessionService.revokeSession(refreshToken);
    }
    
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login, refreshToken, logout };