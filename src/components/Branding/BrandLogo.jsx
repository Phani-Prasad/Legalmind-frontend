import React from 'react';
import LegalmindLogo from './LegalmindLogo';

const BrandLogo = ({ size = 40, textSize = '1.8rem', textColor = 'var(--primary)', showBadge = false }) => {
  // We'll keep the text color as requested but wrap it in a white background for visibility
  const displayTextColor = textColor === '#fff' || textColor === 'white' ? 'var(--primary)' : textColor;

  return (
    <div className="brand-logo-container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '6px',
      width: 'fit-content'
    }}>
      <div className="brand-logo-plate" style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: '12px',
        background: 'white',
        padding: '8px 20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: '1px solid #eee',
        whiteSpace: 'nowrap'
      }}>
        <LegalmindLogo size={size} inverse={false} />
        <span className="serif" style={{ fontSize: textSize, fontWeight: 800, letterSpacing: '-0.5px' }}>
          <span style={{ color: displayTextColor }}>Leg</span>
          <span style={{ color: 'var(--gold)' }}>ai</span>
          <span style={{ color: displayTextColor }}>fy<sup style={{ fontSize: '0.6em', marginLeft: '2px' }}>™</sup></span>
        </span>
      </div>
      {showBadge && <span className="badge-kslu" style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>KSLU Edition</span>}
    </div>
  );
};

export default BrandLogo;
