import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('citizen');
  const { login } = useAuth();
  const navigate = useNavigate();

  const quickLogins = {
    admin: { email: 'admin@city.gov', password: 'admin123' },
    staff: { email: 'staff@city.gov', password: 'staff123' }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleQuickLogin = async (role) => {
    setError('');
    const credentials = quickLogins[role];
    setEmail(credentials.email);
    setPassword(credentials.password);
    
    // Small delay to ensure state is updated
    setTimeout(async () => {
      try {
        await login(credentials);
        navigate('/');
      } catch (err) {
        console.error('Quick login error:', err);
        setError(err.response?.data?.message || 'Quick login failed. Please try again.');
      }
    }, 100);
  };

  const fillCredentials = (role) => {
    const credentials = quickLogins[role];
    setEmail(credentials.email);
    setPassword(credentials.password);
  };

  return (
    <div className="enhanced-auth-card">
      <div className="auth-header">
        <div className="government-seal">
          <div className="seal-inner">
            <div className="seal-icon">🏛️</div>
            <div className="seal-text">CITY PORTAL</div>
          </div>
        </div>
        <h2>Secure Access Portal</h2>
        <p>Official City Complaint Management System</p>
      </div>
      
      <div className="login-tabs">
        <button 
          className={`tab ${activeTab === 'citizen' ? 'active' : ''}`}
          onClick={() => setActiveTab('citizen')}
        >
          👤 Citizen Login
        </button>
        <button 
          className={`tab ${activeTab === 'admin' ? 'active' : ''}`}
          onClick={() => setActiveTab('admin')}
        >
          🔐 Admin Portal
        </button>
      </div>

      <div className="card-body">
        {error && <div className="error">{error}</div>}
        
        {activeTab === 'admin' && (
          <div className="quick-access">
            <p className="quick-access-title">Quick Access (Demo)</p>
            <div className="quick-buttons">
              <button 
                type="button" 
                className="btn-quick admin"
                onClick={() => handleQuickLogin('admin')}
              >
                👨‍💼 Login as Admin
              </button>
              <button 
                type="button" 
                className="btn-quick staff"
                onClick={() => handleQuickLogin('staff')}
              >
                👩‍💻 Login as Staff
              </button>
            </div>
            <div className="divider">or enter credentials manually</div>
            <div className="demo-credentials">
              <button 
                type="button" 
                className="credential-fill"
                onClick={() => fillCredentials('admin')}
              >
                Fill Admin Credentials
              </button>
              <button 
                type="button" 
                className="credential-fill"
                onClick={() => fillCredentials('staff')}
              >
                Fill Staff Credentials
              </button>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <span className="label-icon">📧</span>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={activeTab === 'citizen' ? 'your.email@example.com' : 'admin@city.gov'}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <span className="label-icon">🔒</span>
              Password
            </label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-full">
            <span className="btn-icon">🔐</span>
            Secure Sign In
          </button>
        </form>
        
        {activeTab === 'citizen' && (
          <p className="auth-link">
            New citizen? <a href="/register">Register for an account</a>
          </p>
        )}
        
        <div className="security-notice">
          <span className="security-icon">🛡️</span>
          <span>This is a secure government portal. All access is logged and monitored.</span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
