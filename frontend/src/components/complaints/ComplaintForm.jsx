import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ComplaintService from '../../services/complaint.service';

const ComplaintForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getFormProgress = () => {
    const fields = [title, category, location, description];
    const completed = fields.filter(field => field.trim().length > 0).length;
    return (completed / fields.length) * 100;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('location', location);
    formData.append('priority', priority);
    formData.append('description', description);
    for (let i = 0; i < attachments.length; i++) {
      formData.append('attachments', attachments[i]);
    }

    try {
      console.log('Submitting complaint:', { title, category, location, priority });
      await ComplaintService.createComplaint(formData);
      console.log('Complaint submitted successfully');
      navigate('/');
    } catch (err) {
      console.error('Complaint submission error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit complaint. Please check if you are logged in.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Submit New Complaint</h2>
          <p>Help us improve your city by reporting issues</p>
          <div style={{ marginTop: 'var(--spacing-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>Form Progress</span>
              <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>{Math.round(getFormProgress())}%</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${getFormProgress()}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #10b981, #059669)', 
                  transition: 'width 0.3s ease',
                  borderRadius: '2px'
                }}
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="tooltip">
              <label htmlFor="title">Complaint Title *</label>
              <span className="tooltip-text">Keep it short and specific for faster processing</span>
            </div>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
              placeholder="e.g., Pothole on Main Street"
            />
            {title.length > 0 && (
              <div className="input-hint">
                💡 Good! Keep it descriptive and location-specific
              </div>
            )}
          </div>

          <div className="form-group">
            <div className="tooltip">
              <label htmlFor="category">Category *</label>
              <span className="tooltip-text">Choose the most relevant category for faster routing</span>
            </div>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              disabled={loading}
            >
              <option value="" disabled>Select Category</option>
              <option value="Roads & Infrastructure">🚧 Roads & Infrastructure</option>
              <option value="Water & Utilities">💧 Water & Utilities</option>
              <option value="Electricity">⚡ Electricity</option>
              <option value="Waste Management">🗑️ Waste Management</option>
              <option value="Noise Complaints">🔊 Noise Complaints</option>
              <option value="Other">📋 Other</option>
            </select>
            {category && (
              <div className="input-hint">
                ✅ Category selected: {category}
              </div>
            )}
          </div>

          <div className="form-group">
            <div className="tooltip">
              <label htmlFor="location">Location *</label>
              <span className="tooltip-text">Be as specific as possible to help our teams locate the issue</span>
            </div>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              disabled={loading}
              placeholder="e.g., 123 Main St or Main St & Oak Ave"
            />
            {location.length > 5 && (
              <div className="input-hint">
                📍 Great! Specific location helps us respond faster
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority Level</label>
            <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} disabled={loading}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <div className="tooltip">
              <label htmlFor="description">Detailed Description *</label>
              <span className="tooltip-text">Include what happened, when, and any safety concerns</span>
            </div>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength="1000"
              required
              disabled={loading}
              rows="4"
              style={{ resize: 'vertical', minHeight: '100px' }}
              placeholder="Describe the issue in detail. Include when it started, how it affects you, and any safety concerns..."
            ></textarea>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <small style={{ color: description.length > 50 ? 'var(--color-success)' : 'var(--color-gray-500)' }}>
                Characters: {description.length}/1000
              </small>
              {description.length > 50 && (
                <div className="input-hint" style={{ margin: 0, padding: 'var(--spacing-1) var(--spacing-2)' }}>
                  📝 Good detail level!
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="attachments">Attach Photos (Optional)</label>
            <input
              type="file"
              id="attachments"
              multiple
              onChange={(e) => setAttachments(e.target.files)}
              disabled={loading}
            />
            <p>Supported: JPG, PNG, PDF (Max 5MB each)</p>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'SUBMIT COMPLAINT'}
          </button>
          <button type="button" className="btn" disabled={loading}>Save as Draft</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
