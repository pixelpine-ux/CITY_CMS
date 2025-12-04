import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import BackendTest from '../components/common/BackendTest';

const Register = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
      padding: 'var(--spacing-4)'
    }}>
      <RegisterForm />
      <BackendTest />
    </div>
  );
};

export default Register;
