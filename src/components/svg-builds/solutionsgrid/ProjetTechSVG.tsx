import React from 'react';

export const ProjetTechSVG = () => {
  return (
    <svg viewBox="0 0 300 120" className="w-full h-full">
      <defs>
        <linearGradient id="LinearGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#687387" />
          <stop offset="50%" stopColor="#becbd6" />
          <stop offset="100%" stopColor="#becbd6" />
        </linearGradient>
      </defs>
      <g transform="translate(0,20)">
        <rect
          x="70"
          y="0"
          width="160"
          height="120"
          fill="#858585"
          stroke="#d6d6d6"
          strokeWidth="1"
          rx="4"
        />
        <rect
          x="60"
          y="5"
          width="180"
          height="120"
          fill="#bbbdbb"
          stroke="#d6d6d6"
          strokeWidth="1"
          rx="6"
        />
        <rect
          x="40"
          y="15"
          width="220"
          height="120"
          fill="#dcdedc"
          stroke="#d6d6d6"
          strokeWidth="1"
          rx="8"
        />
        <g transform="translate(0,-24)">
          <rect
            x="90"
            y="44"
            width="120"
            height="11"
            fill="white"
            stroke="#d6d6d6"
            strokeWidth="1"
            rx="5"
            opacity="0.5"
          />
          <text x="150" y="51" fontSize="7" fontWeight="bold" fill="#3d3d3d" textAnchor="middle">
            Mon-API.com
          </text>
          <circle cx="50" cy="48" r="2.5" fill="#ef4444" />
          <circle cx="58" cy="48" r="2.5" fill="#f59e0b" />
          <circle cx="66" cy="48" r="2.5" fill="#10b981" />
        </g>
        <rect
          x="20"
          y="35"
          width="260"
          height="120"
          fill="url(#LinearGradient)"
          stroke="#becbd6"
          strokeWidth="2"
          rx="12"
        />
        <g>
          <rect
            x="80"
            y="42"
            width="140"
            height="12"
            fill="white"
            stroke="#d6d6d6"
            strokeWidth="1"
            rx="5"
            opacity="0.5"
          />
          <text x="150" y="51" fontSize="8" fontWeight="bold" fill="#3d3d3d" textAnchor="middle">
            Mon-Saas.com
          </text>
          <circle cx="32" cy="48" r="3" fill="#ef4444" />
          <circle cx="42" cy="48" r="3" fill="#f59e0b" />
          <circle cx="52" cy="48" r="3" fill="#10b981" />
        </g>
      </g>
    </svg>
  );
};
