import React, { useState } from 'react';
import api from '../../services/api';

const BackendTest = () => {
  const [status, setStatus] = useState('Not tested');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await api.get('/');
      setStatus('✅ Backend connected successfully');
    } catch (error) {
      setStatus(`❌ Backend connection failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      background: 'white', 
      padding: '10px', 
      border: '1px solid #ccc',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 1000
    }}>
      <div>Backend Status: {status}</div>
      <button 
        onClick={testConnection} 
        disabled={loading}
        style={{ marginTop: '5px', fontSize: '12px' }}
      >
        {loading ? 'Testing...' : 'Test Backend'}
      </button>
    </div>
  );
};

export default BackendTest;