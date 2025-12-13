const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  resource: {
    type: String,
    required: true,
    enum: ['complaints', 'users', 'reports', 'system']
  },
  actions: [{
    type: String,
    enum: ['create', 'read', 'update', 'delete', 'assign', 'approve']
  }]
});

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  displayName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  permissions: [permissionSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  hierarchy: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
}, {
  timestamps: true
});

roleSchema.index({ name: 1 });
roleSchema.index({ hierarchy: 1 });

module.exports = mongoose.model('Role', roleSchema);