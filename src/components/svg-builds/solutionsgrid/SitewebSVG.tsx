import React from 'react';

export const SitewebSVG = () => {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        <linearGradient id="shimmer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f3f4f6" stopOpacity="0" />
          <stop offset="20%" stopColor="#e5e7eb" stopOpacity="1" />
          <stop offset="40%" stopColor="#f3f4f6" stopOpacity="0" />
          <stop offset="100%" stopColor="#f3f4f6" stopOpacity="0" />
        </linearGradient>

        {/* Rectangle du gradient qui va se déplacer */}
        <rect
          id="shimmer-rect"
          x="-200"
          y="0"
          width="200"
          height="120"
          fill="url(#shimmer-gradient)"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            from="-200 0"
            to="400 0"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
      </defs>
      {/* Browser window */}
      <rect
        x="10"
        y="10"
        width="180"
        height="130"
        rx="8"
        fill="white"
        stroke="#d1d5db"
        strokeWidth="2"
      />

      {/* Browser bar */}
      <rect x="10" y="10" width="180" height="18" rx="8" fill="#e5e7eb" />
      <circle cx="22" cy="19" r="3" fill="#ef4444" />
      <circle cx="32" cy="19" r="3" fill="#f59e0b" />
      <circle cx="42" cy="19" r="3" fill="#10b981" />

      {/* Header / Nav */}
      <rect x="20" y="35" width="40" height="6" rx="2" fill="#9ca3af" />
      <rect x="140" y="35" width="25" height="6" rx="2" fill="#3b82f6" />

      {/* Product image (left) */}
      <rect
        x="20"
        y="50"
        width="55"
        height="55"
        rx="4"
        fill="#f3f4f6"
        stroke="#d1d5db"
        strokeWidth="1"
      />
      <use href="#shimmer-rect" clipPath="url(#product-clip)" />
      <clipPath id="product-clip">
        <rect x="20" y="50" width="55" height="55" rx="4" />
      </clipPath>
      <circle cx="47.5" cy="77.5" r="12" fill="#e5e7eb" />

      {/* Product info (right) */}
      {/* Title */}
      <rect x="85" y="52" width="90" height="8" rx="2" fill="#374151" />
      <rect x="85" y="63" width="70" height="6" rx="2" fill="#9ca3af" />

      {/* Price */}
      <rect x="85" y="75" width="35" height="10" rx="2" fill="#10b981" opacity="0.3" />
      <text x="88" y="83" fontSize="8" fontWeight="bold" fill="#10b981">
        €49.99
      </text>

      {/* Rating stars */}
      <circle cx="88" cy="92" r="2" fill="#fbbf24" />
      <circle cx="95" cy="92" r="2" fill="#fbbf24" />
      <circle cx="102" cy="92" r="2" fill="#fbbf24" />
      <circle cx="109" cy="92" r="2" fill="#fbbf24" />
      <circle cx="116" cy="92" r="2" fill="#d1d5db" />

      {/* Add to cart button - partiellement coupé */}
      <rect x="85" y="102" width="90" height="14" rx="4" fill="#3b82f6" />
      <text x="98" y="112" fontSize="8" fontWeight="600" fill="white">
        Ajouter au panier
      </text>

      {/* Description lines - ces lignes seront coupées */}
      <rect x="20" y="120" width="155" height="4" rx="1" fill="#e5e7eb" />
      {/* Ces éléments dépassent le viewBox et seront coupés */}
    </svg>
  );
};
