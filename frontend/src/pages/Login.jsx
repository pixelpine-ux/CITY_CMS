import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import CityHero from '../components/ui/CityHero';

const Login = () => {
  return (
    <div className="city-background" style={{ minHeight: '100vh' }}>
      <CityHero 
        title="City CMS"
        subtitle="Connecting Citizens with City Services"
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          marginTop: 'var(--spacing-8)'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-8)',
            boxShadow: 'var(--shadow-xl)',
            minWidth: '400px'
          }}>
            <LoginForm />
          </div>
        </div>
      </CityHero>
    </div>
  );
};

export default Login;
