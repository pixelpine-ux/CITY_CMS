const jwt = require('jsonwebtoken');
const User = require('../models/User');
const RoleService = require('../services/roleService');

// Verify JWT Token
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.type !== 'access') {
      return res.status(401).json({ message: 'Invalid token type.' });
    }

    const user = await User.findById(decoded.userId)
      .populate('role')
      .select('-password');
    
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Invalid token or inactive user.' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired.' });
    }
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// Role-based authorization (legacy)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Access denied. Please authenticate.' });
    }

    if (!roles.includes(req.user.legacyRole)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};

// Permission-based authorization
const requirePermission = (resource, action) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Access denied. Please authenticate.' });
    }

    try {
      const hasPermission = await RoleService.hasPermission(req.user.role._id, resource, action);
      
      if (!hasPermission) {
        return res.status(403).json({ 
          message: `Access denied. Missing permission: ${action} on ${resource}` 
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Error checking permissions.' });
    }
  };
};

module.exports = { authenticate, authorize, requirePermission };