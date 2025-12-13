import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await api.get('/roles');
      setRoles(response.data);
    } catch (err) {
      setError('Failed to fetch roles');
      console.error('Error fetching roles:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading roles...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="role-management">
      <div className="role-header">
        <h2>🔐 Role Management</h2>
        <p>Manage system roles and permissions</p>
      </div>

      <div className="roles-grid">
        {roles.map(role => (
          <div key={role._id} className="role-card">
            <div className="role-info">
              <h3>{role.displayName}</h3>
              <p className="role-description">{role.description}</p>
              <div className="role-meta">
                <span className="hierarchy">Level: {role.hierarchy}</span>
                <span className={`status ${role.isActive ? 'active' : 'inactive'}`}>
                  {role.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            
            <div className="permissions-section">
              <h4>Permissions</h4>
              <div className="permissions-list">
                {role.permissions.map((perm, index) => (
                  <div key={index} className="permission-item">
                    <span className="resource">{perm.resource}</span>
                    <div className="actions">
                      {perm.actions.map(action => (
                        <span key={action} className="action-tag">{action}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleManagement;