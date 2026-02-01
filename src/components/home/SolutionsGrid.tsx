// src/components/home/SolutionsGrid.tsx
'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/services-data';
import { cn } from '@/lib/utils';
import SectionContainer from '@/components/ui/SectionContainer';
import DigitalisationSVG from '../svg-builds/solutionsgrid/DigitalisationSVG';
import { SolutionsGridSVGs } from '../svg-builds/SolutionsGridSVGs';

export default function SolutionsGrid() {
  const sectionGradients = {
    topLeft: 'bg-gradient-to-b from-white to-neutral-50',
    topCenter: 'bg-gradient-to-b from-white to-neutral-50',
    topRight: 'bg-gradient-to-b from-white to-neutral-50',
    middleLeft: 'bg-gradient-to-b from-neutral-50 to-neutral-100',
    middleRight: 'bg-gradient-to-b from-neutral-50 to-neutral-100',
    bottomLeft: 'bg-gradient-to-b from-neutral-100 to-neutral-200',
    bottomCenter: 'bg-gradient-to-b from-neutral-100 to-neutral-200',
    bottomRight: 'bg-gradient-to-b from-neutral-100 to-neutral-200',
  };

  const ServiceCard = ({
    service,
    serviceIndex,
    className,
  }: {
    service: (typeof SERVICES)[0];
    serviceIndex: number;
    className?: string;
  }) => {
    const SVGComponent = SolutionsGridSVGs[serviceIndex];

    return (
      <Link
        href={`/services#${service.id}`}
        className={cn(
          'group relative bg-white overflow-hidden',
          'hover:bg-neutral-50 transition-colors duration-200',
          'hover:border hover:border-forest-600',
          'h-80',
          'flex flex-col',
          className
        )}
      >
        {/* Content - Top */}
        <div className="p-4 lg:px-8 lg:pt-8 lg:pb-4 flex-1 flex flex-col justify-start z-10">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold  text-neutral-950 group-hover:text-forest-700 transition-colors">
              {service.title}
            </h3>

            <p className="text-neutral-600 text-sm leading-relaxed">
              {service.description.split('|')[0]}
            </p>
          </div>

          {/* Arrow */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity self-end">
            <ArrowRight className="w-5 h-5 text-forest-600" />
          </div>
        </div>

        {/* Visual - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-42 -mb-8 z-0">
          {SVGComponent ? (
            <div className="w-full h-full  flex items-end justify-center">
              <SVGComponent />
            </div>
          ) : (
            <div className="w-full h-full bg-sky-100 border-t-2 border-sky-600" />
          )}
        </div>
      </Link>
    );
  };

  return (
    <SectionContainer
      className="bg-neutral-50"
      gradients={sectionGradients}
      showTopGradient
      gridBgColor="bg-neutral-200"
      cellBgColor="bg-gradient-to-b from-neutral-50 to-neutral-100"
      gradientFromColor="from-neutral-50"
      gradientHeight="h-24"
      showBottomBar={false}
      id="solutions-grid "
    >
      {/* Grid pattern background subtil */}
      <div
        className="absolute inset-0 opacity-30 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)',
        }}
      />

      {/* Header */}
      <div className="max-w-3xl px-4 py-4 md:px-8 md:py-8 mb-8 relative z-10">
        <p className="text-forest-600 font-medium text-sm mb-2">Solutions</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-950 mb-6 leading-[01]">
          Des résultats concrets,
          <br />
          pas des promesses.
        </h2>
        <p className="text-xl text-neutral-600 leading-relaxed">
          Automatisation, développement, digitalisation : des solutions qui génèrent des gains
          mesurables pour votre business.
        </p>
      </div>

      {/* Mosaic Grid */}
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5 md:gap-px relative overflow-hidden">
          {/* Background pattern animé */}

          {/* Row 1: 3 carrés */}
          <ServiceCard
            service={SERVICES[0]}
            serviceIndex={0}
            className="border-3 md:border-0 md:bg-gradient-to-b md:from-neutral-50 md:to-slate-50"
          />
          <ServiceCard
            service={SERVICES[2]}
            serviceIndex={2}
            className="border-3 md:border-0 md:bg-gradient-to-b md:from-neutral-50 md:to-slate-50"
          />
          <ServiceCard
            service={SERVICES[1]}
            serviceIndex={1}
            className="border-3 md:border-0 md:bg-gradient-to-b md:from-neutral-50 md:to-slate-50"
          />

          {/* Row 2: 3 carrés */}
          <ServiceCard
            service={SERVICES[3]}
            serviceIndex={3}
            className="border-3 md:border-0 md:col-span-2 md:bg-gradient-to-b md:from-neutral-50 md:to-slate-50"
          />
          <ServiceCard
            service={SERVICES[5]}
            serviceIndex={5}
            className="border-3 md:border-0 md:bg-gradient-to-b md:from-neutral-50 md:to-slate-50"
          />

          {/* Row 3: Digitalisation Complète - Full Width */}
          <Link
            href="/services#digitalisation"
            className="border-3 md:border-0 md:col-span-3 bg-white pb-8 md:py-8 hover:bg-neutral-50 transition-colors duration-200 hover:border hover:border-forest-600 group"
          >
            <div className=" grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Header + Text */}
              <div className="p-8 lg:p-12 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-3xl font-semibold text-neutral-950 group-hover:text-forest-700 transition-colors">
                    Digitalisation Complète
                  </h3>
                  <p className="text-neutral-600 text-base leading-relaxed">
                    Une transformation digitale de bout en bout : CRM, automatisation, site web,
                    paiements, analytics. Tout connecté, tout optimisé.
                  </p>
                </div>

                {/* Arrow */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-6 h-6 text-forest-600" />
                </div>
              </div>

              {/* Right: Animation */}
              <div className="flex items-center justify-center">
                <DigitalisationSVG />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-4 pt-16 pb-8 md:px-8 md:pt-32 md:pb-16 flex flex-col sm:flex-row items-center justify-between gap-8 relative z-10 bg-gradient-to-b from-white to-neutral-100">
        <div className="max-w-2xl">
          <h3 className="text-3xl font-semibold text-neutral-950 mb-3">
            Prêt à digitaliser votre business ?
          </h3>
          <p className="text-neutral-600">
            Obtenez une estimation personnalisée en moins de 5 minutes.
          </p>
        </div>
        <Link
          href="/questionnaire"
          className="group inline-flex items-center gap-3 px-6 py-3 bg-forest-600 hover:bg-forest-500 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
        >
          Simuler mon projet
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="my-20"></div>
    </SectionContainer>
  );
}
