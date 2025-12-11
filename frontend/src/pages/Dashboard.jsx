import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useComplaints } from '../contexts/ComplaintContext';
import StatsCard from '../components/ui/StatsCard';
import ComplaintList from '../components/complaints/ComplaintList';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { complaints, loading, fetchComplaints } = useComplaints();
  const [showResetWarning, setShowResetWarning] = useState(false);
  const [resetting, setResetting] = useState(false);
  
  // Calculate stats from real data
  const totalComplaints = complaints?.length || 0;
  const pendingComplaints = complaints?.filter(c => c.status === 'pending')?.length || 0;
  const resolvedComplaints = complaints?.filter(c => c.status === 'resolved')?.length || 0;
  const inProgressComplaints = complaints?.filter(c => c.status === 'in_progress')?.length || 0;

  const handleLogout = () => {
    logout();
  };
  
  const handleResetData = async () => {
    setResetting(true);
    try {
      // Clear local storage
      const keysToKeep = ['token', 'user'];
      const allKeys = Object.keys(localStorage);
      allKeys.forEach(key => {
        if (!keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      });
      
      // Refresh complaints data
      await fetchComplaints();
      
      setShowResetWarning(false);
      alert('✅ Data reset successfully! The page will refresh.');
      window.location.reload();
    } catch (error) {
      console.error('Reset failed:', error);
      alert('❌ Reset failed. Please try again.');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-gray-50)' }}>
      {/* Navigation Header */}
      <nav className="nav-header">
        <div className="nav-container">
          <a href="/" className="nav-logo">
            <span className="city-icon building">🏢</span>
            City CMS
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <span className="text-gray">Welcome, {user?.name}!</span>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--spacing-8) var(--spacing-4)' }}>
        {/* Hero Section */}
        <div className="city-card mb-4" style={{ textAlign: 'center', padding: 'var(--spacing-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-4)' }}>
            <span className="city-icon building" style={{ fontSize: '2rem', width: '3rem', height: '3rem' }}>🏛️</span>
            <h1 style={{ margin: 0, color: 'var(--color-primary)', fontSize: '2.5rem' }}>City Services Dashboard</h1>
          </div>
          <p className="text-gray" style={{ fontSize: '1.125rem' }}>Manage complaints and connect with city services efficiently</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <StatsCard 
            icon="📊" 
            number={loading ? '...' : totalComplaints.toString()} 
            label="Total Complaints" 
            color="primary"
          />
          <StatsCard 
            icon="⏳" 
            number={loading ? '...' : pendingComplaints.toString()} 
            label="Pending Review" 
            color="warning"
          />
          <StatsCard 
            icon="✅" 
            number={loading ? '...' : resolvedComplaints.toString()} 
            label="Resolved" 
            color="success"
          />
          <StatsCard 
            icon="🚀" 
            number={loading ? '...' : inProgressComplaints.toString()} 
            label="In Progress" 
            color="primary"
          />
        </div>

        {/* Quick Actions */}
        <div className="city-card">
          <h2 style={{ marginBottom: 'var(--spacing-6)', color: 'var(--color-gray-800)' }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-6)' }}>
            <a href="/complaints/new" className="city-card" style={{ 
              textDecoration: 'none', 
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
              color: 'white',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px) scale(1.02)';
              e.target.style.boxShadow = '0 15px 35px rgba(37, 99, 235, 0.4)';
            }} onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = 'var(--shadow-md)';
            }}>
              <div className="city-icon" style={{ 
                fontSize: '2rem', 
                width: '4rem', 
                height: '4rem',
                background: 'rgba(255,255,255,0.2)',
                margin: '0 auto var(--spacing-4)'
              }}>📝</div>
              <h3 style={{ margin: '0 0 var(--spacing-2) 0' }}>Submit New Complaint</h3>
              <p style={{ margin: 0, opacity: 0.9 }}>Report issues in your neighborhood</p>
            </a>
            
            <div className="city-card" style={{ textAlign: 'center', background: 'var(--color-gray-100)' }}>
              <div className="city-icon warning" style={{ 
                fontSize: '2rem', 
                width: '4rem', 
                height: '4rem',
                margin: '0 auto var(--spacing-4)'
              }}>🚨</div>
              <h3 style={{ margin: '0 0 var(--spacing-2) 0', color: 'var(--color-gray-800)' }}>Emergency Services</h3>
              <p style={{ margin: 0, color: 'var(--color-gray-600)' }}>Call 911 for urgent situations</p>
            </div>

            <div className="city-card" style={{ textAlign: 'center', background: 'var(--color-gray-100)' }}>
              <div className="city-icon success" style={{ 
                fontSize: '2rem', 
                width: '4rem', 
                height: '4rem',
                margin: '0 auto var(--spacing-4)'
              }}>📞</div>
              <h3 style={{ margin: '0 0 var(--spacing-2) 0', color: 'var(--color-gray-800)' }}>Contact City Hall</h3>
              <p style={{ margin: 0, color: 'var(--color-gray-600)' }}>General inquiries and information</p>
            </div>
          </div>
        </div>

        {/* Account Info & Reset Data */}
        <div className="city-card" style={{ marginTop: 'var(--spacing-8)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-4)' }}>
            <h3 style={{ margin: 0, color: 'var(--color-gray-800)' }}>Account Information</h3>
            <button 
              onClick={() => setShowResetWarning(true)}
              className="btn"
              style={{ 
                background: 'var(--color-error)', 
                color: 'white',
                fontSize: '0.875rem',
                padding: 'var(--spacing-2) var(--spacing-3)'
              }}
            >
              🗑️ Reset Data
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-4)' }}>
            <div>
              <strong className="text-gray">Role:</strong>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginTop: 'var(--spacing-1)' }}>
                {user?.role === 'admin' && <span className="city-icon error">👑</span>}
                {user?.role === 'staff' && <span className="city-icon primary">👨💼</span>}
                {user?.role === 'citizen' && <span className="city-icon success">👤</span>}
                <span className="status-badge pending" style={{ textTransform: 'capitalize' }}>
                  {user?.role || 'citizen'}
                </span>
              </div>
            </div>
            <div>
              <strong className="text-gray">Email:</strong>
              <p style={{ margin: 'var(--spacing-1) 0 0 0' }}>{user?.email}</p>
            </div>
          </div>
        </div>
        
        {/* Reset Warning Modal */}
        {showResetWarning && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div className="city-card" style={{
              maxWidth: '400px',
              margin: 'var(--spacing-4)',
              background: 'white',
              border: '2px solid var(--color-error)'
            }}>
              <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-6)' }}>
                <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-4)' }}>⚠️</div>
                <h3 style={{ color: 'var(--color-error)', marginBottom: 'var(--spacing-2)' }}>Reset All Data</h3>
                <p style={{ color: 'var(--color-gray-600)', margin: 0 }}>
                  This will clear all cached data and refresh from the server. 
                  <strong>This action cannot be undone.</strong>
                </p>
              </div>
              <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
                <button 
                  onClick={() => setShowResetWarning(false)}
                  className="btn"
                  style={{ flex: 1, background: 'var(--color-gray-200)', color: 'var(--color-gray-700)' }}
                  disabled={resetting}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleResetData}
                  className="btn"
                  style={{ flex: 1, background: 'var(--color-error)', color: 'white' }}
                  disabled={resetting}
                >
                  {resetting ? 'Resetting...' : 'Reset Data'}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Recent Complaints */}
        <div style={{ marginTop: 'var(--spacing-8)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-4)' }}>
            <h2 style={{ margin: 0, color: 'var(--color-gray-800)' }}>My Complaints</h2>
            <button 
              onClick={fetchComplaints}
              className="btn"
              style={{ 
                background: 'var(--color-primary)', 
                color: 'white',
                fontSize: '0.875rem',
                padding: 'var(--spacing-2) var(--spacing-4)'
              }}
              disabled={loading}
            >
              {loading ? '🔄 Refreshing...' : '🔄 Refresh'}
            </button>
          </div>
          <ComplaintList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;