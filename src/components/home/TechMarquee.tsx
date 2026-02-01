// src/components/home/TechMarquee.tsx
'use client';

import Image from 'next/image';
import { TECHS, DEFAULT_LOGO_WIDTH } from '@/lib/tech-data';

export default function TechMarquee() {
  return (
    <section className="py-6 bg-white overflow-hidden">
      <div className="relative">
        {/* Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Marquee */}
        <div className="flex gap-12 animate-marquee">
          {[...TECHS, ...TECHS].map((tech, index) => {
            const width = tech.width || DEFAULT_LOGO_WIDTH;

            return (
              <div
                key={`${tech.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                style={{
                  width: `${width}px`, // ← Parent dicte width
                  height: '40px', // ← Parent dicte height
                }}
              >
                {/* ✅ Container relatif pour Image fill */}
                <div className="relative w-full h-full">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    fill // ← Remplit le parent
                    className="object-contain" // ← Garde aspect ratio
                    sizes={`${width}px`} // ← Hint pour optimization
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
