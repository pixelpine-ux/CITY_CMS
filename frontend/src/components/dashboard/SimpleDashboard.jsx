import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const SimpleDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dashboard Working!</h1>
      <p>Welcome, {user?.name || 'User'}!</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <button onClick={logout} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Logout
      </button>
    </div>
  );
};

export default SimpleDashboard;