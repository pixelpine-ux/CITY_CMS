const express = require('express');
const {
  createComplaint,
  getComplaints,
  getComplaint,
  updateStatus,
  assignComplaint
} = require('../controllers/complaintController');
const { authenticate, authorize } = require('../middlewares/auth');
const { validateComplaint, validateStatusUpdate } = require('../middlewares/validation');

const router = express.Router();

// POST /api/complaints - Create complaint (authenticated users)
router.post('/', authenticate, validateComplaint, createComplaint);

// GET /api/complaints - Get complaints (role-based access)
router.get('/', authenticate, getComplaints);

// GET /api/complaints/:id - Get single complaint
router.get('/:id', authenticate, getComplaint);

// PUT /api/complaints/:id/status - Update status (staff/admin only)
router.put('/:id/status', authenticate, authorize('staff', 'admin'), validateStatusUpdate, updateStatus);

// PUT /api/complaints/:id/assign - Assign to staff (admin only)
router.put('/:id/assign', authenticate, authorize('admin'), assignComplaint);

module.exports = router;