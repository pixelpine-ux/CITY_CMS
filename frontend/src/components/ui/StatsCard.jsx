import React from 'react';

const StatsCard = ({ icon, number, label, color = 'primary' }) => {
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <div className={`city-icon ${color}`} style={{ fontSize: '1.25rem' }}>
          {icon}
        </div>
        <div>
          <div className="stat-number">{number}</div>
          <div className="stat-label">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;