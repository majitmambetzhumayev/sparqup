// src/components/layout/PageHeader.tsx
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  children?: ReactNode; // Pour CTAs custom si besoin
}

export default function PageHeader({ title, subtitle, badge, children }: PageHeaderProps) {
  return (
    <section className="relative bg-forest-900  border-neutral-200">
      <div className="container pb-5 pt-30 px-4 md:px-32 md:pt-40">
        <div className="text-left">
          {/* Badge optionnel */}
          {badge && (
            <div className="inline-block px-4 py-1.5 border border-forest-200 rounded-full text-sm font-medium text-forest-700 mb-6">
              {badge}
            </div>
          )}

          {/* Subtitle (surtitre) */}
          {subtitle && (
            <p className="text-md md:text-xl font-semibold uppercase tracking-wide text-forest-600 mb-2">
              {subtitle}
            </p>
          )}

          {/* Title */}
          <h1 className="font-heading text-6xl md:text-8xl font-bold text-neutral-200 mb-2">
            {title}
          </h1>

          {/* Children (CTAs, etc) */}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
