import React from 'react';

export const ContenuSVG = () => {
  return (
    <svg viewBox="0 0 300 120" className="w-full h-full">
      {/* Background */}
      <rect x="0" y="0" width="300" height="120" fill="none" />

      {/* Content Plan - Mode paysage (large et horizontal) */}
      <g transform="translate(20,0) ">
        {/* Container calendrier */}
        <rect
          x="10"
          y="10"
          width="180"
          height="100"
          rx="6"
          fill="white"
          stroke="#e5e7eb"
          strokeWidth="2"
        />

        {/* Header */}
        <rect x="10" y="10" width="180" height="14" rx="6" fill="#3b82f6" />
        <text x="100" y="20" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">
          Content Plan - Janvier 2026
        </text>

        {/* Semaine 1 */}
        <text x="15" y="34" fontSize="5" fill="#6b7280">
          Semaine 1
        </text>

        {/* Lundi */}
        <rect
          x="15"
          y="38"
          width="24"
          height="16"
          rx="3"
          fill="#dbeafe"
          stroke="#93c5fd"
          strokeWidth="1"
        />
        <text x="18" y="44" fontSize="4" fontWeight="600" fill="#3b82f6">
          LUN
        </text>
        <rect x="18" y="47" width="18" height="2" rx="1" fill="#3b82f6" opacity="0.4" />
        <rect x="18" y="50" width="15" height="2" rx="1" fill="#3b82f6" opacity="0.4" />

        {/* Mardi */}
        <rect
          x="41"
          y="38"
          width="24"
          height="16"
          rx="3"
          fill="#fef3c7"
          stroke="#fde68a"
          strokeWidth="1"
        />
        <text x="44" y="44" fontSize="4" fontWeight="600" fill="#f59e0b">
          MAR
        </text>
        <rect x="44" y="47" width="18" height="2" rx="1" fill="#f59e0b" opacity="0.4" />

        {/* Mercredi */}
        <rect
          x="67"
          y="38"
          width="24"
          height="16"
          rx="3"
          fill="#dbeafe"
          stroke="#93c5fd"
          strokeWidth="1"
        />
        <text x="70" y="44" fontSize="4" fontWeight="600" fill="#3b82f6">
          MER
        </text>
        <rect x="70" y="47" width="18" height="2" rx="1" fill="#3b82f6" opacity="0.4" />
        <rect x="70" y="50" width="16" height="2" rx="1" fill="#3b82f6" opacity="0.4" />

        {/* Jeudi */}
        <rect
          x="93"
          y="38"
          width="24"
          height="16"
          rx="3"
          fill="#f3f4f6"
          stroke="#d1d5db"
          strokeWidth="1"
        />
        <text x="96" y="44" fontSize="4" fontWeight="600" fill="#9ca3af">
          JEU
        </text>

        {/* Vendredi */}
        <rect
          x="119"
          y="38"
          width="24"
          height="16"
          rx="3"
          fill="#dcfce7"
          stroke="#86efac"
          strokeWidth="1"
        />
        <text x="122" y="44" fontSize="4" fontWeight="600" fill="#10b981">
          VEN
        </text>
        <rect x="122" y="47" width="18" height="2" rx="1" fill="#10b981" opacity="0.4" />
        <rect x="122" y="50" width="14" height="2" rx="1" fill="#10b981" opacity="0.4" />

        {/* Weekend (grisé) */}
        <rect
          x="145"
          y="38"
          width="20"
          height="16"
          rx="3"
          fill="#f9fafb"
          stroke="#e5e7eb"
          strokeWidth="1"
        />
        <text x="148" y="44" fontSize="4" fill="#d1d5db">
          SAM
        </text>

        <rect
          x="167"
          y="38"
          width="20"
          height="16"
          rx="3"
          fill="#f9fafb"
          stroke="#e5e7eb"
          strokeWidth="1"
        />
        <text x="170" y="44" fontSize="4" fill="#d1d5db">
          DIM
        </text>

        {/* Semaine 2 */}
        <text x="15" y="64" fontSize="5" fill="#6b7280">
          Semaine 2
        </text>

        <rect
          x="15"
          y="68"
          width="24"
          height="16"
          rx="3"
          fill="#fce7f3"
          stroke="#fbcfe8"
          strokeWidth="1"
        />
        <text x="18" y="74" fontSize="4" fontWeight="600" fill="#ec4899">
          LUN
        </text>
        <rect x="18" y="77" width="18" height="2" rx="1" fill="#ec4899" opacity="0.4" />

        <rect
          x="41"
          y="68"
          width="24"
          height="16"
          rx="3"
          fill="#dbeafe"
          stroke="#93c5fd"
          strokeWidth="1"
        />
        <text x="44" y="74" fontSize="4" fontWeight="600" fill="#3b82f6">
          MAR
        </text>
        <rect x="44" y="77" width="16" height="2" rx="1" fill="#3b82f6" opacity="0.4" />
        <rect x="44" y="80" width="18" height="2" rx="1" fill="#3b82f6" opacity="0.4" />

        <rect
          x="67"
          y="68"
          width="24"
          height="16"
          rx="3"
          fill="#f3f4f6"
          stroke="#d1d5db"
          strokeWidth="1"
        />
        <text x="70" y="74" fontSize="4" fontWeight="600" fill="#9ca3af">
          MER
        </text>

        <rect
          x="93"
          y="68"
          width="24"
          height="16"
          rx="3"
          fill="#dcfce7"
          stroke="#86efac"
          strokeWidth="1"
        />
        <text x="96" y="74" fontSize="4" fontWeight="600" fill="#10b981">
          JEU
        </text>
        <rect x="96" y="77" width="18" height="2" rx="1" fill="#10b981" opacity="0.4" />

        <rect
          x="119"
          y="68"
          width="24"
          height="16"
          rx="3"
          fill="#dbeafe"
          stroke="#93c5fd"
          strokeWidth="1"
        />
        <text x="122" y="74" fontSize="4" fontWeight="600" fill="#3b82f6">
          VEN
        </text>
        <rect x="122" y="77" width="15" height="2" rx="1" fill="#3b82f6" opacity="0.4" />

        {/* Stats */}
        <text x="100" y="98" fontSize="6" fontWeight="600" fill="#374151" textAnchor="middle">
          14 posts planifiés
        </text>
        <rect x="50" y="102" width="100" height="4" rx="2" fill="#e5e7eb" />
        <rect x="50" y="102" width="70" height="4" rx="2" fill="#3b82f6" />
      </g>

      {/* Feed Instagram - Mobile (plus petit) */}
      <g transform="translate(-20,10)">
        {/* Téléphone */}
        <rect x="205" y="15" width="80" height="90" rx="14" fill="#1f2937" />
        <rect x="208" y="18" width="74" height="84" rx="10" fill="white" />

        {/* Status bar */}
        <rect x="210" y="20" width="71" height="8" rx="10" fill="#f9fafb" />
        <text x="218" y="24" fontSize="4" fill="#374151" textAnchor="middle">
          9:41
        </text>

        {/* Instagram header */}
        <rect x="210" y="26" width="71" height="10" fill="white" />
        <text x="214" y="33" fontSize="11" fontWeight="300" fill="#374151" textAnchor="middle">
          +
        </text>
        <text x="246" y="32" fontSize="5" fontWeight="400" fill="#374151" textAnchor="middle">
          Pour vous{' '}
        </text>
        <path d="M260,31 L261,32 L262,31 " stroke="#000000" strokeWidth="0.5" fill="none" />
        <path
          d="M276,31 L278,33 L280,31 A 1 1, 0, 0, 0, 278 29 A 1 1, 0, 0, 0, 276,31"
          stroke="#000000"
          strokeWidth="0.5"
          fill="none"
        />

        {/* ligne de stories (plus compacte) */}
        {/* Row 1 */}
        <circle cx="219" cy="47" r="7" fill="#c48c6c" />
        <circle cx="223" cy="51" r="3" fill="#000000" />
        <path d="M221 51 H225 M223 49 V53" stroke="white" strokeWidth="1" fill="none" />
        <circle cx="237" cy="47" r="7" fill="#dc2626" stroke="#3eff29" strokeWidth="1" />
        <circle cx="255" cy="47" r="7" fill="#b6e6f2" stroke="#ff9a42" strokeWidth="1" />
        <circle cx="273" cy="47" r="7" fill="#d0fcc5" stroke="#ff9a42" strokeWidth="1" />

        {/* Row 2 */}
        <rect x="211" y="60" width="68" height="60" fill="#ddd6fe" />
      </g>
    </svg>
  );
};
