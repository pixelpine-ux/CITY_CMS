import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '1rem', background: '#1e40af', color: 'white', borderRadius: '8px' }}>
        <div>
          <h1 style={{ margin: 0 }}>🏛️ City Complaint Portal</h1>
          <p style={{ margin: '0.5rem 0 0 0' }}>Welcome back, {user?.name}!</p>
        </div>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>Total Complaints</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>0</p>
          <small style={{ color: '#6b7280' }}>All time submissions</small>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🕰️</div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>Pending</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#d97706' }}>0</p>
          <small style={{ color: '#6b7280' }}>Awaiting review</small>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✨</div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>Resolved</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#059669' }}>0</p>
          <small style={{ color: '#6b7280' }}>Completed</small>
        </div>
      </div>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
        <h2 style={{ marginBottom: '1rem', color: '#374151' }}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <a href="/complaints/new" style={{ display: 'block', padding: '1.5rem', background: '#1e40af', color: 'white', textDecoration: 'none', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Submit Complaint</h3>
            <p style={{ margin: 0, opacity: 0.9 }}>Report a new issue</p>
          </a>
          
          <div style={{ padding: '1.5rem', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📞</div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>Emergency</h3>
            <p style={{ margin: 0, color: '#6b7280' }}>Call 911 for urgent issues</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f3f4f6', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Your Account</h3>
        <p><strong>Role:</strong> {user?.role || 'citizen'}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        {user?.role === 'admin' && <p style={{ color: '#dc2626' }}>🔑 Administrator Access</p>}
        {user?.role === 'staff' && <p style={{ color: '#7c3aed' }}>👨‍💼 Staff Member</p>}
      </div>
    </div>
  );
};

export default Dashboard;
