import React from 'react';

const ComplaintCard = ({ complaint }) => {
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'in-progress': return 'status-in-progress';
      case 'resolved': return 'status-resolved';
      default: return 'status-pending';
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-4)' }}>
          <h3 style={{ margin: 0, color: 'var(--color-gray-900)', fontSize: 'var(--font-size-lg)' }}>{complaint.title}</h3>
          <span className={getStatusClass(complaint.status)}>{complaint.status}</span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-4)' }}>
          <div>
            <strong style={{ color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)' }}>Priority:</strong>
            <p style={{ margin: 0, color: 'var(--color-gray-800)' }}>{complaint.priority}</p>
          </div>
          <div>
            <strong style={{ color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)' }}>Category:</strong>
            <p style={{ margin: 0, color: 'var(--color-gray-800)' }}>{complaint.category}</p>
          </div>
          <div>
            <strong style={{ color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)' }}>Location:</strong>
            <p style={{ margin: 0, color: 'var(--color-gray-800)' }}>{complaint.location}</p>
          </div>
          <div>
            <strong style={{ color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)' }}>Submitted:</strong>
            <p style={{ margin: 0, color: 'var(--color-gray-800)' }}>{new Date(complaint.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        
        <button className="btn btn-primary">View Details</button>
      </div>
    </div>
  );
};

export default ComplaintCard;
