import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="government-login-page">
      <div className="government-header">
        <div className="header-content">
          <div className="government-logo">
            <div className="logo-seal">
              <div className="seal-outer">
                🏛️
              </div>
            </div>
            <div className="logo-text">
              <h1>City of Excellence</h1>
              <p>Complaint Management System</p>
            </div>
          </div>
          <div className="header-info">
            <span className="info-item">
              <span className="info-icon">📞</span>
              (555) 123-CITY
            </span>
            <span className="info-item">
              <span className="info-icon">🌐</span>
              www.cityofexcellence.gov
            </span>
          </div>
        </div>
      </div>
      
      <div className="login-main">
        <div className="login-background">
          <div className="bg-pattern"></div>
          <div className="bg-overlay"></div>
        </div>
        
        <div className="login-container">
          <div className="login-content">
            <div className="welcome-section">
              <div className="building-skyline">
                <div className="building b1"></div>
                <div className="building b2"></div>
                <div className="building b3"></div>
                <div className="building b4"></div>
                <div className="building b5"></div>
              </div>
              <h2>Welcome to the Official Portal</h2>
              <p>Secure access to city services and complaint management</p>
              <div className="features">
                <div className="feature">
                  <span className="feature-icon">📝</span>
                  <span>Submit Complaints</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🔍</span>
                  <span>Track Progress</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">📊</span>
                  <span>View Analytics</span>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
      
      <div className="government-footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Accessibility</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="footer-text">
            <p>© 2025 City of Excellence. All rights reserved. | An official government website.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
