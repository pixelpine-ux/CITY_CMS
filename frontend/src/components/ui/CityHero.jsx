import React from 'react';

const CityHero = ({ title, subtitle, children }) => {
  return (
    <div className="city-background" style={{ 
      minHeight: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white',
      padding: 'var(--spacing-8) var(--spacing-4)'
    }}>
      <div style={{ maxWidth: '800px', zIndex: 1 }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 'var(--spacing-4)',
          marginBottom: 'var(--spacing-6)'
        }}>
          <div className="city-icon building" style={{ 
            width: '3rem', 
            height: '3rem', 
            fontSize: '1.5rem' 
          }}>
            🏢
          </div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700',
            margin: 0
          }}>
            {title}
          </h1>
        </div>
        
        {subtitle && (
          <p style={{ 
            fontSize: '1.25rem', 
            opacity: 0.9,
            marginBottom: 'var(--spacing-6)'
          }}>
            {subtitle}
          </p>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default CityHero;