import React from 'react';
import { useParams } from 'react-router-dom';

const ComplaintDetail = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Complaint Detail for ID: {id}</h1>
      {/* The actual ComplaintDetail component will go here */}
    </div>
  );
};

export default ComplaintDetail;
