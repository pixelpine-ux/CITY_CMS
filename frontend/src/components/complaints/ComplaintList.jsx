import React, { useEffect, useState } from 'react';
import ComplaintService from '../../services/complaint.service';
import ComplaintCard from './ComplaintCard';

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await ComplaintService.getComplaints();
        setComplaints(data);
      } catch (err) {
        setError('Failed to fetch complaints.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return <div className="loading">Loading complaints...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: 'var(--spacing-6)', color: 'var(--color-gray-800)' }}>My Complaints</h2>
      {complaints.length === 0 ? (
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center', padding: 'var(--spacing-12)' }}>
            <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--font-size-lg)' }}>No complaints submitted yet.</p>
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
