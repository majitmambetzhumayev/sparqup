// src/components/services/ServiceSection.tsx
'use client';

import { ComponentType, useState } from 'react';
import Image from 'next/image';

import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import SectionContainer from '../ui/SectionContainer';
import { useQuestionnaireModal } from '../questionnaire/QuestionnaireProvider';

interface ServiceSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  technologies: string[];
  showTopGradient?: boolean;
  pricing?: string;
  duration: string;
  imageUrl: string;
  SVG?: ComponentType<{ instanceId?: string }>;
  imageAlt: string;
  reversed?: boolean;
  imageBorder?: boolean;
  imageShadow?: boolean;
  imageRounded?: boolean;
  imageObjectFit?: 'cover' | 'contain';
  aspectRatio?: '4/3' | '3/4' | '16/9' | '1/1' | 'auto';
}

export default function ServiceSection({
  id,
  title,
  subtitle,
  description,
  features,
  technologies,
  showTopGradient,
  duration,
  imageUrl,
  SVG,
  imageAlt,
  reversed = false,
  imageBorder = true,
  imageShadow = true,
  imageRounded = true,
  imageObjectFit = 'cover',
  aspectRatio = '4/3',
}: ServiceSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hookText, fullText] = description.includes('|')
    ? description.split('|')
    : [description, ''];

  const { open } = useQuestionnaireModal();

  const aspectClasses = {
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-[16/9]',
    '1/1': 'aspect-square',
    '3/4': 'aspect-[3/4]',
    auto: '',
  };

  const imageWrapperClasses = cn(
    'relative overflow-hidden',
    aspectClasses[aspectRatio],
    imageRounded && 'rounded-2xl',
    imageBorder && 'border-2 border-neutral-200',
    imageShadow && 'shadow-xl'
  );

  const imageClasses = cn(imageObjectFit === 'cover' ? 'object-cover' : 'object-contain');

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

  return (
    <SectionContainer
      className="scroll-mt-20"
      gradients={sectionGradients}
      gridBgColor="bg-neutral-200"
      cellBgColor="bg-gradient-to-b from-neutral-50 to-neutral-100"
      showTopGradient={showTopGradient}
      showTopBar={false}
      showBottomBar={false}
      id={id}
    >
      {/* 🎯 ESPACEMENT SECTION: py-16 mobile, lg:py-40 desktop */}
      <div className="py-16 lg:py-32 container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* ========== UNIFIED RESPONSIVE LAYOUT ========== */}
          <div
            className={cn(
              // Mobile : stack vertical
              'flex flex-col space-y-6',
              // Desktop : grid 2 colonnes
              'lg:grid lg:grid-cols-2 lg:gap-16 lg:space-y-0',
              reversed && 'lg:grid-flow-dense'
            )}
          >
            {/* ========== VISUAL COLUMN ========== */}
            <div
              className={cn(
                'relative',
                // Mobile : premier (avec header intégré)
                'order-1',
                // Desktop : position selon reversed + centré verticalement
                'lg:order-none lg:self-center',
                reversed && 'lg:col-start-2'
              )}
            >
              {/* Header - MOBILE ONLY */}
              <div className="lg:hidden mb-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-forest-600 mb-2">
                  {subtitle}
                </p>
                <h2 className="text-3xl font-bold text-neutral-950 mb-4">{title}</h2>
              </div>

              {/* Visual */}
              {SVG ? (
                <div className="flex items-center justify-center">
                  <SVG instanceId={id} />
                </div>
              ) : (
                <div className={cn('relative', imageWrapperClasses)}>
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className={imageClasses}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}

              {/* Accent décoratif - desktop only, image only */}
              {!SVG && imageShadow && (
                <div className="hidden lg:block absolute -bottom-6 -right-6 w-32 h-32 bg-forest-600 rounded-2xl -z-10 opacity-10" />
              )}
            </div>

            {/* ========== CONTENT COLUMN ========== */}
            <div
              className={cn(
                // Mobile : second (après visuel avec header)
                'order-2',
                // Desktop : position selon reversed
                'lg:order-none',
                reversed && 'lg:col-start-1 lg:row-start-1'
              )}
            >
              {/* Header - DESKTOP ONLY */}
              <div className="hidden lg:block">
                <p className="text-sm font-semibold uppercase tracking-wide text-forest-600 mb-3">
                  {subtitle}
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-950 mb-6">{title}</h2>
              </div>

              {/* Description */}
              {/* 🎯 ESPACEMENT: mb-6 mobile, lg:mb-4 desktop */}
              <div className="text-base lg:text-lg text-neutral-700 lg:text-neutral-800 mb-6 lg:mb-4">
                {/* 🎯 ESPACEMENT: mb-2 mobile, lg:mb-3 desktop entre hook et full text */}
                <p className="text-neutral-800 mb-2 lg:mb-3">{hookText}</p>

                {fullText && (
                  <div
                    className={cn(
                      'grid transition-all duration-500',
                      // Desktop : toujours visible
                      'lg:grid-rows-[1fr] lg:opacity-100',
                      // Mobile : expandable
                      !isExpanded && 'grid-rows-[0fr] opacity-0',
                      isExpanded && 'grid-rows-[1fr] opacity-100'
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-2">{fullText}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="border-t border-neutral-200 pt-4">
                {/* Expandable wrapper - mobile only, always visible desktop */}
                <div
                  className={cn(
                    'grid transition-all duration-500',
                    // Desktop : toujours visible
                    'lg:grid-rows-[1fr] lg:opacity-100',
                    // Mobile : expandable
                    !isExpanded && 'grid-rows-[0fr] opacity-0',
                    isExpanded && 'grid-rows-[1fr] opacity-100'
                  )}
                >
                  <div className="overflow-hidden">
                    {/* 🎯 ESPACEMENT: space-y-4 mobile, lg:space-y-6 desktop */}
                    <div className="space-y-4 lg:space-y-6 mb-4 lg:mb-6">
                      {/* Features */}
                      {features.length > 0 && (
                        <div>
                          {/* 🎯 ESPACEMENT: mb-3 mobile, lg:mb-4 desktop avant liste */}
                          <h3 className="text-sm lg:text-base font-semibold text-neutral-950 mb-3 lg:mb-4">
                            Ce qui est inclus
                          </h3>
                          {/* 🎯 ESPACEMENT: space-y-2 mobile, lg:space-y-3 desktop entre items */}
                          <ul className="space-y-2 lg:space-y-3">
                            {features.slice(0, 5).map((feature, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 lg:gap-3 text-sm lg:text-base"
                              >
                                <Check className="w-4 h-4 lg:w-5 lg:h-5 text-forest-600 flex-shrink-0 mt-0.5" />
                                <span className="text-neutral-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Technologies */}
                      {technologies.length > 0 && (
                        <div>
                          {/* 🎯 ESPACEMENT: mb-2 mobile, lg:mb-3 desktop avant badges */}
                          <h3 className="text-xs lg:text-sm font-semibold text-neutral-600 uppercase tracking-wide mb-2 lg:mb-3">
                            Technologies
                          </h3>
                          {/* 🎯 ESPACEMENT: gap-1.5 mobile, lg:gap-2 desktop entre badges */}
                          <div className="flex flex-wrap gap-1.5 lg:gap-2">
                            {technologies.map((tech, i) => (
                              <span
                                key={i}
                                className={cn(
                                  'border border-neutral-300 rounded-full text-neutral-700',
                                  'px-2.5 py-1 text-xs bg-white/60',
                                  'lg:px-3 lg:py-1 lg:text-sm lg:bg-neutral-100'
                                )}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Duration */}
                      {duration && (
                        /* 🎯 ESPACEMENT: pt-3 mobile, lg:pt-6 + lg:gap-4 desktop */
                        <div
                          className={cn(
                            'pt-3 border-t border-neutral-200',
                            'lg:pt-6 lg:flex lg:flex-col sm:lg:flex-row lg:gap-4 lg:items-start sm:lg:items-center'
                          )}
                        >
                          <div className="flex-1 mb-4 lg:mb-0">
                            {/* 🎯 ESPACEMENT: mb-1 entre label et valeur */}
                            <div className="text-xs lg:text-sm text-neutral-600 mb-1">
                              Durée <span className="hidden lg:inline">moyenne</span>
                            </div>
                            <div className="text-sm lg:text-lg font-semibold text-neutral-700">
                              {duration}
                            </div>
                          </div>

                          {/* CTA Desktop only */}
                          <button
                            onClick={() => open()}
                            className="hidden lg:inline-flex px-6 py-3 bg-forest-600 hover:bg-forest-500 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
                          >
                            Simuler ce service →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile CTAs - lg:hidden */}
                {/* 🎯 ESPACEMENT: gap-2.5 entre boutons */}
                <div className="flex flex-col gap-2.5 lg:hidden">
                  {!isExpanded && (
                    <button
                      onClick={() => open()}
                      className="w-full px-5 py-2.5 bg-forest-600 hover:bg-forest-500 text-white text-center text-sm font-semibold rounded-lg transition-colors"
                    >
                      Simuler ce service →
                    </button>
                  )}

                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-white/40 rounded-lg transition-colors border border-neutral-200"
                  >
                    <span className="text-sm font-semibold text-neutral-950">
                      {isExpanded ? 'Masquer' : 'Voir les détails'}
                    </span>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 text-neutral-600 transition-transform duration-300',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  </button>

                  {isExpanded && (
                    <button
                      onClick={() => open()}
                      className="w-full px-5 py-2.5 bg-forest-600 hover:bg-forest-500 text-white text-center text-sm font-semibold rounded-lg transition-colors"
                    >
                      Simuler ce service →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
