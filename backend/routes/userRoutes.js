const express = require('express');
const { getProfile, getUsers, createStaff, updateUserRole } = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

// GET /api/users/profile - Protected route (any authenticated user)
router.get('/profile', authenticate, getProfile);

// GET /api/users - Admin only route
router.get('/', authenticate, authorize('admin'), getUsers);

// POST /api/users/staff - Admin only: create staff member
router.post('/staff', authenticate, authorize('admin'), createStaff);

// PUT /api/users/:userId/role - Admin only: update user role
router.put('/:userId/role', authenticate, authorize('admin'), updateUserRole);

module.exports = router;