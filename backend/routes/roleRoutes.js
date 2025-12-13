const express = require('express');
const { authenticate, requirePermission } = require('../middlewares/auth');
const RoleService = require('../services/roleService');
const Role = require('../models/Role');

const router = express.Router();

// GET /api/roles - Get all roles (admin only)
router.get('/', authenticate, requirePermission('system', 'read'), async (req, res) => {
  try {
    const roles = await RoleService.getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/roles/:id - Get single role (admin only)
router.get('/:id', authenticate, requirePermission('system', 'read'), async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;