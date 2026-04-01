import React from 'react';
import './Branding.css';

const LegalmindLogo = ({ size = 48 }) => {
  return (
    <div className="neural-logo-container" style={{ width: size, height: size }}>
      <svg 
        viewBox="0 18 100 70" 
        className="neural-scale-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glow Effects */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* The Central Pillar - The Pillar of Knowledge */}
        <line x1="50" y1="20" x2="50" y2="85" className="pillar-line" strokeWidth="4" />
        <circle cx="50" cy="20" r="4" className="node pulse-1" />
        <circle cx="50" cy="50" r="3" className="node pulse-2" />
        <circle cx="50" cy="85" r="5" className="node pulse-3" />

        {/* The Horizontal Beam - The Neural Connection */}
        <path d="M20 40 Q50 35 80 40" className="beam-path" fill="none" strokeWidth="3" />
        <circle cx="20" cy="40" r="3" className="node pulse-beam" />
        <circle cx="80" cy="40" r="3" className="node pulse-beam" />

        {/* The Scales - The Balance of AI Justice */}
        <g className="scale-group">
          {/* Left Bowl */}
          <path d="M20 40 L10 70 A15 5 0 0 0 30 70 Z" className="bowl-path" />
          {/* Right Bowl */}
          <path d="M80 40 L70 70 A15 5 0 0 0 90 70 Z" className="bowl-path" />
        </g>
        
        {/* Connection Lines (Neural Web) */}
        <line x1="20" y1="40" x2="50" y2="50" className="web-line" strokeWidth="1" strokeDasharray="2,2" />
        <line x1="80" y1="40" x2="50" y2="50" className="web-line" strokeWidth="1" strokeDasharray="2,2" />
      </svg>
    </div>
  );
};

export default LegalmindLogo;
