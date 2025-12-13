import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import RoleManagement from '../components/admin/RoleManagement';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('roles');
  const { user } = useAuth();

  // Check if user has admin permissions
  if (!user || user.role !== 'admin') {
    return (
      <div className="access-denied">
        <h2>🚫 Access Denied</h2>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'roles', label: '🔐 Role Management', icon: '🔐' },
    { id: 'users', label: '👥 User Management', icon: '👥' },
    { id: 'system', label: '⚙️ System Settings', icon: '⚙️' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'roles':
        return <RoleManagement />;
      case 'users':
        return <div className="coming-soon">👥 User Management - Coming Soon</div>;
      case 'system':
        return <div className="coming-soon">⚙️ System Settings - Coming Soon</div>;
      default:
        return <RoleManagement />;
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>🏛️ Administration Panel</h1>
        <p>System administration and management</p>
      </div>

      <div className="admin-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;