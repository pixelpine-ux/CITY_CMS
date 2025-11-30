const express = require('express');
const { getProfile, getUsers } = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

// GET /api/users/profile - Protected route (any authenticated user)
router.get('/profile', authenticate, getProfile);

// GET /api/users - Admin only route
router.get('/', authenticate, authorize('admin'), getUsers);

module.exports = router;