const Role = require('../models/Role');

class RoleService {
  // Initialize default roles
  static async initializeDefaultRoles() {
    const defaultRoles = [
      {
        name: 'citizen',
        displayName: 'Citizen',
        description: 'Regular city resident who can submit and track complaints',
        hierarchy: 1,
        permissions: [
          {
            resource: 'complaints',
            actions: ['create', 'read']
          }
        ]
      },
      {
        name: 'staff',
        displayName: 'Staff Member',
        description: 'City staff who can manage and process complaints',
        hierarchy: 5,
        permissions: [
          {
            resource: 'complaints',
            actions: ['create', 'read', 'update', 'assign']
          },
          {
            resource: 'users',
            actions: ['read']
          }
        ]
      },
      {
        name: 'admin',
        displayName: 'Administrator',
        description: 'System administrator with full access',
        hierarchy: 10,
        permissions: [
          {
            resource: 'complaints',
            actions: ['create', 'read', 'update', 'delete', 'assign', 'approve']
          },
          {
            resource: 'users',
            actions: ['create', 'read', 'update', 'delete']
          },
          {
            resource: 'reports',
            actions: ['create', 'read', 'update', 'delete']
          },
          {
            resource: 'system',
            actions: ['create', 'read', 'update', 'delete']
          }
        ]
      }
    ];

    for (const roleData of defaultRoles) {
      await Role.findOneAndUpdate(
        { name: roleData.name },
        roleData,
        { upsert: true, new: true }
      );
    }
  }

  // Check if user has permission
  static async hasPermission(userRole, resource, action) {
    const role = await Role.findById(userRole);
    if (!role || !role.isActive) return false;

    const permission = role.permissions.find(p => p.resource === resource);
    return permission && permission.actions.includes(action);
  }

  // Get role by name
  static async getRoleByName(roleName) {
    return await Role.findOne({ name: roleName, isActive: true });
  }

  // Get all active roles
  static async getAllRoles() {
    return await Role.find({ isActive: true }).sort({ hierarchy: 1 });
  }
}

module.exports = RoleService;