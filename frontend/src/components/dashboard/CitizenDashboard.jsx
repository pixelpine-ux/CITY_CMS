import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useComplaints } from '../../contexts/ComplaintContext.jsx';
import ComplaintList from '../complaints/ComplaintList';

const CitizenDashboard = () => {
  const { logout, user } = useAuth();
  const { complaints, loading, error } = useComplaints();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(c => c.status === 'Pending').length;
  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;
  const inProgressComplaints = complaints.filter(c => c.status === 'In Progress').length;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <div>
          <h1>City Complaint Portal</h1>
          <p style={{ margin: 0, opacity: 0.9, fontSize: 'var(--font-size-lg)' }}>
            {getGreeting()}, {user?.name || 'Citizen'}! Welcome back to your dashboard.
          </p>
        </div>
        <button onClick={handleLogout} className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>Logout</button>
      </div>

      <div className="stats-grid">
        <div className="stats-card total">
          <div className="stats-icon">📊</div>
          <h3>Total Complaints</h3>
          <p>{totalComplaints}</p>
          <small>All time submissions</small>
        </div>
        <div className="stats-card pending">
          <div className="stats-icon">🕰️</div>
          <h3>Pending Review</h3>
          <p>{pendingComplaints}</p>
          <small>Awaiting assignment</small>
        </div>
        <div className="stats-card progress">
          <div className="stats-icon">🔧</div>
          <h3>In Progress</h3>
          <p>{inProgressComplaints}</p>
          <small>Being worked on</small>
        </div>
        <div className="stats-card resolved">
          <div className="stats-icon">✨</div>
          <h3>Resolved</h3>
          <p>{resolvedComplaints}</p>
          <small>Successfully completed</small>
        </div>
      </div>
      
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-grid">
          <Link to="/complaints/new" className="action-card primary">
            <div className="action-icon">📝</div>
            <h3>Submit Complaint</h3>
            <p>Report a new issue in your area</p>
          </Link>
          <div className="action-card">
            <div className="action-icon">📞</div>
            <h3>Emergency Hotline</h3>
            <p>Call 911 for urgent issues</p>
          </div>
          <div className="action-card">
            <div className="action-icon">📊</div>
            <h3>Track Status</h3>
            <p>Monitor your complaint progress</p>
          </div>
        </div>
      </div>

      <ComplaintList />
    </div>
  );
};

export default CitizenDashboard;
