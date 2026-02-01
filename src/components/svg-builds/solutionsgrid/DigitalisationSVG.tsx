'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Item {
  id: string;
  label: string;
  icon: React.ReactNode;
  gridPosition: number; // 1-20
  color: string;
  inactiveFilter?: string;
}

interface Connection {
  from: string;
  to: string;
  path: string;
  gradient: { start: string; end: string };
  wave: number; // 1-6
}

const items: Item[] = [
  {
    id: 'crm',
    label: 'CRM',
    gridPosition: 1,
    color: 'text-forest-400',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="16" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="14" cy="32" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="34" cy="32" r="4" stroke="currentColor" strokeWidth="2" />
        <path
          d="M20 20L16 28M28 20L32 28"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'calendrier',
    label: 'Calendrier',
    gridPosition: 2,
    color: 'text-[#006BFF]',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="8" y="10" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 18H40" stroke="currentColor" strokeWidth="2" />
        <path d="M16 6V14M32 6V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="26" r="1.5" fill="currentColor" />
        <circle cx="24" cy="26" r="1.5" fill="currentColor" />
        <circle cx="32" cy="26" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'paiement',
    label: 'Paiement',
    gridPosition: 3,
    color: 'text-[#635BFF]',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="6" y="14" width="36" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
        <rect x="6" y="14" width="36" height="6" fill="currentColor" opacity="0.2" />
        <rect x="10" y="26" width="12" height="4" rx="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'mailing',
    label: 'Mailing',
    gridPosition: 8,
    color: 'text-[#FFE01B]',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="6" y="12" width="36" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
        <path
          d="M6 15L24 27L42 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'zapier',
    label: 'Zapier',
    gridPosition: 10,
    color: '',
    inactiveFilter: 'grayscale(100%) brightness(1.45) contrast(0.85)',
    icon: (
      <svg width="28" height="32" viewBox="0 0 32 32">
        <image href="/media/logos/svg/zapier-logo.svg" x="0" y="0" width="32" height="32" />
      </svg>
    ),
  },
  {
    id: 'analytics',
    label: 'Analytics',
    gridPosition: 12,
    color: 'text-[#F9AB00]',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 40 L12 40"
          stroke="#E37400"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 40 L24 24"
          stroke="#E37400"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M36 40 L36 8"
          stroke="#F9AB00"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'manychat',
    label: 'ManyChat',
    gridPosition: 13,
    color: '',
    inactiveFilter: 'brightness(3.5) contrast(0.7)',
    icon: (
      <svg width="28" height="32" viewBox="0 0 32 32">
        <image href="/media/logos/svg/manychat-logo.svg" x="0" y="0" width="32" height="32" />
      </svg>
    ),
  },
  {
    id: 'website',
    label: 'Site Web',
    gridPosition: 15,
    color: 'text-forest-400',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" />
        <path
          d="M10 24H38M24 10C24 10 18 16 18 24C18 32 24 38 24 38M24 10C24 10 30 16 30 24C30 32 24 38 24 38"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: 'social',
    label: 'Réseaux',
    gridPosition: 18,
    color: 'text-black',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24,20 A 8 8 0 1 0 32,28 V8 A 8 8 0 0 0 40,16"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

// Connexions avec chemins suivant la grille (passant par cellules vides)
// Nouveaux centres: Row0(y=40), Row1(y=130), Row2(y=220), Row3(y=310), Row4(y=400)
// Col0(x=40), Col1(x=130), Col2(x=220), Col3(x=310)
// Items: CRM(40,40), Cal(130,40), Paiement(220,40), Mail(310,130), Zap(130,220), Ana(310,220), Many(40,310), Web(220,310), Social(130,400)
// Rayon de courbure: 12px aux virages
const connections: Connection[] = [
  // Animation 1
  {
    from: 'social',
    to: 'manychat',
    path: 'M126,366 L126,322 Q126,310 114,310 L74,310',
    gradient: { start: '#E1306C', end: '#00D068' },
    wave: 1,
  },
  {
    from: 'social',
    to: 'website',
    path: 'M134,366 L134,322 Q134,310 146,310 L186,310',
    gradient: { start: '#E1306C', end: '#95E1D3' },
    wave: 1,
  },
  // Animation 2
  {
    from: 'manychat',
    to: 'social',
    path: 'M74,310 L118,310 Q130,310 130,322 L130,366',
    gradient: { start: '#00D068', end: '#E1306C' },
    wave: 2,
  },
  {
    from: 'manychat',
    to: 'zapier',
    path: 'M40,276 L40,232 Q40,220 52,220 L96,220',
    gradient: { start: '#00D068', end: '#FF4A00' },
    wave: 2,
  },
  {
    from: 'website',
    to: 'analytics',
    path: 'M220,276 L220,232 Q220,220 232,220 L276,220',
    gradient: { start: '#95E1D3', end: '#F9AB00' },
    wave: 2,
  },
  // Animation 3
  {
    from: 'zapier',
    to: 'crm',
    path: 'M130,186 L130,142 Q130,130 118,130 L52,130 Q40,130 40,118 L40,74',
    gradient: { start: '#FF4A00', end: '#F38181' },
    wave: 3,
  },
  {
    from: 'website',
    to: 'mailing',
    path: 'M220,276 L220,142 Q220,130 232,130 L276,130',
    gradient: { start: '#95E1D3', end: '#FFE01B' },
    wave: 3,
  },
  // Animation 4
  {
    from: 'mailing',
    to: 'crm',
    path: 'M276,126 L52,126 Q40,126 40,114 L40,74',
    gradient: { start: '#FFE01B', end: '#F38181' },
    wave: 4,
  },
  {
    from: 'mailing',
    to: 'zapier',
    path: 'M276,134 L142,134 Q130,134 130,146 L130,186',
    gradient: { start: '#FFE01B', end: '#FF4A00' },
    wave: 4,
  },
  // Animation 5
  {
    from: 'website',
    to: 'paiement',
    path: 'M220,276 L220,74',
    gradient: { start: '#95E1D3', end: '#635BFF' },
    wave: 5,
  },
  {
    from: 'website',
    to: 'zapier',
    path: 'M212,276 L212,232 Q212,220 200,220 L164,220',
    gradient: { start: '#95E1D3', end: '#FF4A00' },
    wave: 5,
  },
  {
    from: 'website',
    to: 'mailing',
    path: 'M228,276 L228,142 Q228,130 240,130 L276,130',
    gradient: { start: '#95E1D3', end: '#FFE01B' },
    wave: 5,
  },
  // Animation 6
  {
    from: 'zapier',
    to: 'crm',
    path: 'M122,186 L122,142 Q122,130 110,130 L52,130 Q40,130 40,118 L40,74',
    gradient: { start: '#FF4A00', end: '#F38181' },
    wave: 6,
  },
  {
    from: 'zapier',
    to: 'calendrier',
    path: 'M130,186 L130,74',
    gradient: { start: '#FF4A00', end: '#006BFF' },
    wave: 6,
  },
  {
    from: 'paiement',
    to: 'zapier',
    path: 'M220,74 L220,118 Q220,130 208,130 L150,130 Q138,130 138,142 L138,186',
    gradient: { start: '#635BFF', end: '#FF4A00' },
    wave: 6,
  },
];

export default function DigitalisationSVG() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeItems, setActiveItems] = useState<Set<string>>(new Set());
  const [activeWave, setActiveWave] = useState<number | null>(null);

  useEffect(() => {
    // Initialize all paths with dashoffset = length BEFORE animation starts
    connections.forEach(connection => {
      const waveIndex = connections.filter(c => c.wave === connection.wave).indexOf(connection);
      const pathEl = svgRef.current?.querySelector(
        `path[data-wave="${connection.wave}"][data-index="${waveIndex}"]`
      ) as SVGPathElement | null;

      if (pathEl) {
        const length = pathEl.getTotalLength();
        pathEl.style.strokeDasharray = `${length}`;
        pathEl.style.strokeDashoffset = `${length}`;
      }
    });

    let currentWave = 1;
    let timeoutId: ReturnType<typeof setTimeout>;

    const animateWave = () => {
      // Get all connections for current wave
      const waveConnections = connections.filter(c => c.wave === currentWave);

      // Get all unique items in this wave
      const itemsInWave = new Set<string>();
      waveConnections.forEach(conn => {
        itemsInWave.add(conn.from);
        itemsInWave.add(conn.to);
      });

      // Activate items and wave
      setActiveItems(itemsInWave);
      setActiveWave(currentWave);

      // Animate all paths in this wave
      waveConnections.forEach((connection, connIndex) => {
        const pathEl = svgRef.current?.querySelector(
          `path[data-wave="${currentWave}"][data-index="${connIndex}"]`
        ) as SVGPathElement | null;

        if (pathEl) {
          const length = pathEl.getTotalLength();
          pathEl.style.strokeDasharray = `${length}`;
          pathEl.style.strokeDashoffset = `${length}`;

          // Draw (0.6s)
          pathEl.style.transition = 'stroke-dashoffset 0.6s ease-out';
          requestAnimationFrame(() => {
            pathEl.style.strokeDashoffset = '0';
          });
        }
      });

      // Hold for 3s, then erase
      setTimeout(() => {
        waveConnections.forEach((connection, connIndex) => {
          const pathEl = svgRef.current?.querySelector(
            `path[data-wave="${currentWave}"][data-index="${connIndex}"]`
          ) as SVGPathElement | null;

          if (pathEl) {
            const length = pathEl.getTotalLength();
            // Erase in same direction (A→B) by going to negative offset
            pathEl.style.transition = 'stroke-dashoffset 0.4s ease-in';
            pathEl.style.strokeDashoffset = `${-length}`;
          }
        });

        // Clear after erase animation
        setTimeout(() => {
          // CRITICAL: Complete reset of all paths to initial state
          waveConnections.forEach((connection, connIndex) => {
            const pathEl = svgRef.current?.querySelector(
              `path[data-wave="${currentWave}"][data-index="${connIndex}"]`
            ) as SVGPathElement | null;

            if (pathEl) {
              // Remove all transitions
              pathEl.style.transition = 'none';
              // Reset to initial hidden state
              const length = pathEl.getTotalLength();
              pathEl.style.strokeDasharray = `${length}`;
              pathEl.style.strokeDashoffset = `${length}`;
              // Remove opacity override
              pathEl.style.opacity = '';
              // Force reflow for SVG
              pathEl.getBBox();
            }
          });

          setActiveItems(new Set());
          setActiveWave(null);

          // Next wave
          currentWave = (currentWave % 6) + 1;
          timeoutId = setTimeout(animateWave, 300);
        }, 400);
      }, 2000);
    };

    timeoutId = setTimeout(animateWave, 1000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[350px] mx-auto">
      <div className="relative w-full">
        {/* SVG Connections Layer */}
        <svg
          ref={svgRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 350 440"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '350px', height: '440px' }}
        >
          <defs>
            {connections.map((connection, index) => (
              <linearGradient
                key={`gradient-${connection.wave}-${index}`}
                id={`gradient-${connection.wave}-${index}`}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor={connection.gradient.start} />
                <stop offset="100%" stopColor={connection.gradient.end} />
              </linearGradient>
            ))}
          </defs>

          {/* Animated connections */}
          {connections.map((connection, connIndex) => {
            const waveIndex = connections
              .filter(c => c.wave === connection.wave)
              .indexOf(connection);
            return (
              <path
                key={`connection-${connection.wave}-${connIndex}`}
                data-wave={connection.wave}
                data-index={waveIndex}
                d={connection.path}
                stroke={`url(#gradient-${connection.wave}-${connIndex})`}
                strokeWidth="3"
                fill="none"
                opacity={activeWave === connection.wave ? 1 : 0}
                style={{
                  transition: 'opacity 0.3s ease',
                }}
              />
            );
          })}
        </svg>

        {/* Items Layer - CSS Grid */}
        <div className="grid grid-cols-4 gap-[10px] relative z-10" style={{ width: '350px' }}>
          {/* Render grid with proper empty cells */}
          {Array.from({ length: 20 }, (_, index) => {
            const position = index + 1;
            const item = items.find(i => i.gridPosition === position);

            if (!item) {
              // Empty cell
              return <div key={`empty-${position}`} className="w-20 h-20" />;
            }

            const isActive = activeItems.has(item.id);

            // Item cell
            return (
              <div key={item.id} className="w-20 h-20 flex items-center justify-center">
                <div
                  className={`flex flex-col items-center justify-center gap-1 border-2 rounded-lg p-2 transition-all duration-300 w-full h-full box-border ${
                    isActive
                      ? 'scale-105 bg-white border-white shadow-lg shadow-neutral-400/50'
                      : 'scale-100 bg-neutral-100 border-neutral-200'
                  }`}
                >
                  <div
                    className={`transition-all duration-300 ${
                      item.color
                        ? isActive
                          ? item.color // Couleurs dicté par l'item
                          : 'text-neutral-300 grayscale brightness-90' // Gris pour tout
                        : isActive
                          ? 'opacity-100' // Couleurs originales du svg, s'applique si item.color est vide
                          : 'text-neutral-300 grayscale brightness-90 opacity-30' // Gris pour tout
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div
                    className={`font-body text-xs font-medium text-center leading-tight transition-colors duration-300 ${
                      isActive ? 'text-neutral-800' : 'text-neutral-100'
                    }`}
                  >
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
