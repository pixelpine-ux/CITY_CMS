import React from 'react';
import { useComplaints } from '../../contexts/ComplaintContext';
import ComplaintCard from './ComplaintCard';

const ComplaintList = () => {
  const { complaints, loading, error } = useComplaints();

  if (loading) {
    return <div className="loading">Loading complaints...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      {loading ? (
        <div className="loading">Loading complaints...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : complaints.length === 0 ? (
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center', padding: 'var(--spacing-12)' }}>
            <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--font-size-lg)' }}>No complaints submitted yet.</p>
            <a href="/complaints/new" className="btn btn-primary" style={{ marginTop: 'var(--spacing-4)' }}>
              Submit Your First Complaint
            </a>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
          {complaints.map((complaint) => (
            <ComplaintCard key={complaint._id} complaint={complaint} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintList;
