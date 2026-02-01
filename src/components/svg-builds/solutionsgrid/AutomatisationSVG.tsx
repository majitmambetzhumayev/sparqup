import React from 'react';

export const AutomatisationSVG = () => {
  return (
    <svg viewBox="0 0 200 150" className=" w-[90%] h-full ">
      <g transform="translate(40,10)">
        {/* Roue dentée qui tourne - centrée */}
        <g transform="translate(100, 100)">
          <g>
            {/* Anneau (donut) principal */}
            <circle cx="0" cy="0" r="40" fill="none" stroke="#d19c86" strokeWidth="20" />
            {/* 12 dents (trapèzes) réparties autour */}
            {/* Dent 1 - 0° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#d19c86" />

            {/* Dent 2 - 40° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#d19c86" transform="rotate(40)" />

            {/* Dent 3 - 80° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#d19c86" transform="rotate(80)" />

            {/* Dent 4 - 120° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#d19c86" transform="rotate(120)" />

            {/* Dent 5 - 160° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#d19c86" transform="rotate(160)" />

            {/* Dent 6 - 200° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#d19c86" transform="rotate(200)" />

            {/* Dent 7 - 240° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#d19c86" transform="rotate(240)" />

            {/* Dent 8 - 280° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#d19c86" transform="rotate(280)" />

            {/* Dent 9 - 320° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#d19c86" transform="rotate(320)" />

            {/* Animation de rotation avec ease-in-out */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0;360"
              dur="10s"
              begin="0s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.6 0 0.4 1"
              keyTimes="0;01"
            />
          </g>

          {/* Logo Zapier au centre (statique) */}
          <image href="/media/logos/svg/zapier-logo.svg" x="-20" y="-20" width="40" height="40" />
        </g>
        {/* DEUXIÈME ROUE - en haut à droite, plus petite */}
        <g transform="translate(148, 30)">
          <g>
            {/* Anneau plus petit */}
            <circle cx="0" cy="0" r="20" fill="none" stroke="#1A73E8" strokeWidth="5" />

            {/* 4 dents (simplifié) */}
            <polygon points="-12,-18 -8,-28 8,-28 12,-18" fill="#1A73E8" transform="rotate(-20)" />
            <polygon points="-12,-18 -8,-28 8,-28 12,-18" fill="#1A73E8" transform="rotate(70)" />
            <polygon points="-12,-18 -8,-28 8,-28 12,-18" fill="#1A73E8" transform="rotate(160)" />
            <polygon points="-12,-18 -8,-28 8,-28 12,-18" fill="#1A73E8" transform="rotate(250)" />

            {/* Animation DIFFÉRENTE - sens inverse, plus rapide */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="810;0"
              dur="10s"
              begin="0s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.6 0 0.4 1"
              keyTimes="0;1"
            />
          </g>
          {/* Logo google calendar */}
          <image
            href="/media/logos/svg/google-calendar-logo.svg"
            x="-10"
            y="-10"
            width="20"
            height="20"
          />
        </g>
        {/* TROISIÈME ROUE - en haut à gauche  */}
        <g transform="translate(-2, 52)">
          <g>
            {/* Anneau (donut) principal */}
            <circle cx="0" cy="0" r="40" fill="none" stroke="#6e6e6e" strokeWidth="20" />

            {/* 12 dents (trapèzes) réparties autour */}
            {/* Dent 1 - 0° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#6e6e6e" transform="rotate(-10)" />

            {/* Dent 2 - 40° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#6e6e6e" transform="rotate(30)" />

            {/* Dent 3 - 80° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#6e6e6e" transform="rotate(70)" />

            {/* Dent 4 - 120° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#6e6e6e" transform="rotate(110)" />

            {/* Dent 5 - 160° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#6e6e6e" transform="rotate(150)" />

            {/* Dent 6 - 200° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#6e6e6e" transform="rotate(190)" />

            {/* Dent 7 - 240° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#6e6e6e" transform="rotate(230)" />

            {/* Dent 8 - 280° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#6e6e6e" transform="rotate(270)" />

            {/* Dent 9 - 320° */}
            <polygon points="-12,-40 -8,-60 8,-60 12,-40" fill="#6e6e6e" transform="rotate(310)" />

            {/* Animation DIFFÉRENTE - sens inverse, plus rapide */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="360;0"
              dur="10s"
              begin="0s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.6 0 0.4 1"
              keyTimes="0;1"
            />
          </g>
          <image href="/media/logos/svg/chatgpt-logo.svg" x="-16" y="-16" width="32" height="32" />
        </g>
      </g>
    </svg>
  );
};
