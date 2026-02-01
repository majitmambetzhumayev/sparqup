import React from 'react';

export const ConnexionSVG = () => {
  return (
    <svg viewBox="0 0 300 120" className="w-full h-full">
      <defs>
        {/* Gradient pour le trait néon */}
        <linearGradient id="neon-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
          <stop offset="20%" stopColor="#a78bfa" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="80%" stopColor="#a78bfa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>

        {/* Gradient shimmer pour placeholder animé */}
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f3f4f6" />
          <stop offset="50%" stopColor="#e5e7eb" />
          <stop offset="100%" stopColor="#f3f4f6" />
          <animate attributeName="x1" values="-100%;100%" dur="2s" repeatCount="indefinite" />
          <animate attributeName="x2" values="0%;200%" dur="2s" repeatCount="indefinite" />
        </linearGradient>

        {/* Gradient néon pour les données */}
        <radialGradient id="neon-blue">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="30%" stopColor="#60a5fa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
        </radialGradient>
      </defs>

      {/* Connecteur central - points avec trajectoire étendue */}
      <g>
        {/* Line de connexion statique */}
        <line
          x1="130"
          y1="60"
          x2="170"
          y2="60"
          stroke="#e5e7eb"
          strokeWidth="2"
          strokeDasharray="4 2"
        />

        {/* Premier paquet - Point 1 */}
        <circle cx="130" cy="60" r="3" fill="#10b981">
          <animate attributeName="cx" values="80;220" dur="2s" repeatCount="indefinite" />
          <animate
            attributeName="opacity"
            values="0;0;1;1;0;0"
            keyTimes="0;0.2;0.21;0.79;0.8;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Premier paquet - Point 2 (décalé 10px) */}
        <circle cx="120" cy="60" r="3" fill="#10b981">
          <animate attributeName="cx" values="70;210" dur="2s" repeatCount="indefinite" />
          <animate
            attributeName="opacity"
            values="0;0;1;1;0;0"
            keyTimes="0;0.2;0.21;0.79;0.8;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Premier paquet - Point 3 (décalé 20px) */}
        <circle cx="110" cy="60" r="3" fill="#10b981">
          <animate attributeName="cx" values="60;200" dur="2s" repeatCount="indefinite" />
          <animate
            attributeName="opacity"
            values="0;0;1;1;0;0"
            keyTimes="0;0.2;0.21;0.79;0.8;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Deuxième paquet - Point 1 (commence à 1s) */}
        <circle cx="130" cy="60" r="3" fill="#10b981">
          <animate
            attributeName="cx"
            values="80;220"
            dur="2s"
            begin="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0;1;1;0;0"
            keyTimes="0;0.2;0.21;0.79;0.8;1"
            dur="2s"
            begin="1s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Deuxième paquet - Point 2 */}
        <circle cx="120" cy="60" r="3" fill="#10b981">
          <animate
            attributeName="cx"
            values="70;210"
            dur="2s"
            begin="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0;1;1;0;0"
            keyTimes="0;0.2;0.21;0.79;0.8;1"
            dur="2s"
            begin="1s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Deuxième paquet - Point 3 */}
        <circle cx="110" cy="60" r="3" fill="#10b981">
          <animate
            attributeName="cx"
            values="60;200"
            dur="2s"
            begin="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0;1;1;0;0"
            keyTimes="0;0.2;0.21;0.79;0.8;1"
            dur="2s"
            begin="1s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Dashboard CRM - Gauche */}
      <g>
        {/* Browser window */}
        <rect
          x="10"
          y="5"
          width="120"
          height="140"
          rx="8"
          fill="white"
          stroke="#d1d5db"
          strokeWidth="2"
        />

        {/* Browser bar */}
        <rect x="10" y="5" width="120" height="16" rx="8" fill="#e5e7eb" />
        <circle cx="22" cy="13" r="2.5" fill="#ef4444" />
        <circle cx="32" cy="13" r="2.5" fill="#f59e0b" />
        <circle cx="42" cy="13" r="2.5" fill="#10b981" />

        {/* CRM Header avec stats */}
        <text x="18" y="34" fontSize="8" fontWeight="bold" fill="#374151">
          Tableau de bord CRM
        </text>

        {/* KPI Cards */}
        <rect x="18" y="42" width="45" height="22" rx="4" fill="#dbeafe" />
        <text x="22" y="51" fontSize="6" fill="#3b82f6">
          Contacts
        </text>
        <text x="22" y="61" fontSize="10" fontWeight="bold" fill="#3b82f6">
          243
        </text>

        <rect x="70" y="42" width="45" height="22" rx="4" fill="#dcfce7" />
        <text x="74" y="51" fontSize="6" fill="#10b981">
          Deals actifs
        </text>
        <text x="74" y="61" fontSize="10" fontWeight="bold" fill="#10b981">
          18
        </text>

        {/* Contact list */}
        <text x="18" y="76" fontSize="7" fontWeight="600" fill="#6b7280">
          Contacts récents
        </text>

        {/* Contact 1 */}
        <circle cx="24" cy="86" r="5" fill="#93c5fd" />
        <text x="33" y="89" fontSize="6" fontWeight="600" fill="#374151">
          Marie Dupont
        </text>
        <rect x="90" y="83" width="25" height="6" rx="2" fill="#dcfce7" />
        <text x="93" y="88" fontSize="5" fill="#10b981">
          Qualifié
        </text>

        {/* Contact 2 */}
        <circle cx="24" cy="99" r="5" fill="#93c5fd" />
        <text x="33" y="102" fontSize="6" fontWeight="600" fill="#374151">
          Jean Martin
        </text>
        <rect x="90" y="96" width="25" height="6" rx="2" fill="#fef3c7" />
        <text x="93" y="101" fontSize="5" fill="#f59e0b">
          En cours
        </text>

        {/* Contact 3 */}
        <circle cx="24" cy="112" r="5" fill="#93c5fd" />
        <text x="33" y="115" fontSize="6" fontWeight="600" fill="#374151">
          Sophie Chen
        </text>
        <rect x="90" y="109" width="25" height="6" rx="2" fill="#dbeafe" />
        <text x="93" y="114" fontSize="5" fill="#3b82f6">
          Nouveau
        </text>

        {/* Pipeline */}
        <text x="18" y="130" fontSize="7" fontWeight="600" fill="#6b7280">
          Pipeline de vente
        </text>
        <rect x="18" y="134" width="97" height="5" rx="2.5" fill="#e5e7eb" />
        <rect x="18" y="134" width="66" height="5" rx="2.5" fill="#3b82f6" />
        <text x="18" y="147" fontSize="6" fill="#6b7280">
          68% de taux de conversion
        </text>
      </g>

      {/* Dashboard Notion - Droite */}
      <g>
        {/* Browser window */}
        <rect
          x="170"
          y="5"
          width="120"
          height="140"
          rx="8"
          fill="white"
          stroke="#d1d5db"
          strokeWidth="2"
        />

        {/* Browser bar */}
        <rect x="170" y="5" width="120" height="16" rx="8" fill="#e5e7eb" />
        <circle cx="182" cy="13" r="2.5" fill="#ef4444" />
        <circle cx="192" cy="13" r="2.5" fill="#f59e0b" />
        <circle cx="202" cy="13" r="2.5" fill="#10b981" />

        {/* Tasks - 3 seulement */}
        <g>
          <rect x="178" y="28" width="8" height="8" rx="2" fill="#10b981" />
          <path
            d="M 180.5 31 L 182.5 33.5 L 185.5 29.5"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="190" y="28" width="85" height="8" rx="2" fill="url(#shimmer)" />
        </g>

        <g>
          <rect x="178" y="40" width="8" height="8" rx="2" fill="#10b981" />
          <path
            d="M 180.5 43 L 182.5 45.5 L 185.5 41.5"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="190" y="40" width="72" height="8" rx="2" fill="url(#shimmer)" />
        </g>

        <g>
          <rect
            x="178"
            y="52"
            width="8"
            height="8"
            rx="2"
            stroke="#d1d5db"
            strokeWidth="1.5"
            fill="white"
          />
          <rect x="190" y="52" width="65" height="8" rx="2" fill="url(#shimmer)" />
        </g>

        {/* Analytics section */}
        <rect
          x="178"
          y="68"
          width="97"
          height="60"
          rx="4"
          fill="#f9fafb"
          stroke="#e5e7eb"
          strokeWidth="1"
        />

        {/* Donut chart */}
        <g>
          <circle cx="208" cy="98" r="16" fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle
            cx="208"
            cy="98"
            r="16"
            fill="none"
            stroke="url(#neon-blue)"
            strokeWidth="6"
            strokeDasharray="75 100"
            strokeDashoffset="0"
            transform="rotate(-90 208 98)"
          >
            <animate
              attributeName="stroke-dasharray"
              values="70 100;75 100;70 100"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <text x="208" y="101" fontSize="9" fontWeight="bold" fill="#3b82f6" textAnchor="middle">
            75%
          </text>
        </g>

        {/* Bar charts néon */}
        <g>
          <rect x="235" y="108" width="10" height="17" rx="2" fill="#e5e7eb" />
          <rect x="235" y="108" width="10" height="17" rx="2" fill="url(#neon-blue)">
            <animate attributeName="height" values="14;17;14" dur="3s" repeatCount="indefinite" />
            <animate attributeName="y" values="111;108;111" dur="3s" repeatCount="indefinite" />
          </rect>

          <rect x="248" y="98" width="10" height="27" rx="2" fill="#e5e7eb" />
          <rect x="248" y="98" width="10" height="27" rx="2" fill="url(#neon-blue)">
            <animate
              attributeName="height"
              values="24;27;24"
              dur="3s"
              repeatCount="indefinite"
              begin="0.5s"
            />
            <animate
              attributeName="y"
              values="101;98;101"
              dur="3s"
              repeatCount="indefinite"
              begin="0.5s"
            />
          </rect>

          <rect x="261" y="113" width="10" height="12" rx="2" fill="#e5e7eb" />
          <rect x="261" y="113" width="10" height="12" rx="2" fill="url(#neon-blue)">
            <animate
              attributeName="height"
              values="9;12;9"
              dur="3s"
              repeatCount="indefinite"
              begin="1s"
            />
            <animate
              attributeName="y"
              values="116;113;116"
              dur="3s"
              repeatCount="indefinite"
              begin="1s"
            />
          </rect>
        </g>
      </g>
    </svg>
  );
};
