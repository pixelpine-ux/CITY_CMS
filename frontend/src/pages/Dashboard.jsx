import React from 'react';
import CitizenDashboard from '../components/dashboard/CitizenDashboard';

const Dashboard = () => {
  // For now, we will only show the citizen dashboard.
  // We will add role-based logic later.
  return (
    <div style={{ padding: '2rem' }}>
      <CitizenDashboard />
    </div>
  );
};

export default Dashboard;
