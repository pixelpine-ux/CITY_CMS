const express = require('express');
const {
  createComplaint,
  getComplaints,
  getComplaint,
  updateStatus,
  assignComplaint
} = require('../controllers/complaintController');
const { authenticate, authorize, requirePermission } = require('../middlewares/auth');
const { validateComplaint, validateStatusUpdate, validateAssignment } = require('../middlewares/validation');

const router = express.Router();

// POST /api/complaints - Create complaint (authenticated users)
router.post('/', authenticate, requirePermission('complaints', 'create'), validateComplaint, createComplaint);

// GET /api/complaints - Get complaints (role-based access)
router.get('/', authenticate, requirePermission('complaints', 'read'), getComplaints);

// GET /api/complaints/:id - Get single complaint
router.get('/:id', authenticate, requirePermission('complaints', 'read'), getComplaint);

// PUT /api/complaints/:id/status - Update status (staff/admin only)
router.put('/:id/status', authenticate, requirePermission('complaints', 'update'), validateStatusUpdate, updateStatus);

// PUT /api/complaints/:id/assign - Assign to staff (admin only)
router.put('/:id/assign', authenticate, requirePermission('complaints', 'assign'), validateAssignment, assignComplaint);

module.exports = router;