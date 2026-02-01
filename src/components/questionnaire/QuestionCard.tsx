// src/components/questionnaire/QuestionCard.tsx
'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  /** Numéro optionnel (ex: "Question 2 sur 5") */
  questionNumber?: string;

  /** Titre principal - grande typo style Tally */
  title: string;

  /** Sous-titre optionnel */
  subtitle?: string;

  /** Contenu de la question */
  children: ReactNode;

  /** Message d'aide contextuel */
  tip?: string;
  tipType?: 'info' | 'warning' | 'error';

  /** Actions footer (boutons custom, etc.) */
  actions?: ReactNode;

  /** Largeur du contenu */
  width?: 'narrow' | 'normal' | 'wide' | 'full';

  /** Espacement vertical */
  spacing?: 'compact' | 'normal' | 'loose';

  className?: string;
}

export default function QuestionCard({
  questionNumber,
  title,
  subtitle,
  children,
  tip,
  tipType = 'info',
  actions,
  width = 'normal',
  spacing = 'normal',
  className,
}: QuestionCardProps) {
  const widthClasses = {
    narrow: 'max-w-xl', // Intro, confirmation, questions simples
    normal: 'max-w-2xl', // Questions standard
    wide: 'max-w-4xl', // Grilles, estimation
    full: 'max-w-full', // Pleine largeur
  };

  const spacingClasses = {
    compact: 'py-4 lg:py-6',
    normal: 'py-6 lg:py-8',
    loose: 'py-8 lg:py-12',
  };

  const tipStyles = {
    info: 'bg-blue-50/50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50/50 border-amber-200 text-amber-800',
    error: 'bg-red-50/50 border-red-200 text-red-800',
  };

  return (
    <div
      className={cn(
        'w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500',
        widthClasses[width],
        spacingClasses[spacing],
        className
      )}
    >
      {/* Header - Très grande typo style Tally */}
      <div className="mb-8 lg:mb-12">
        {questionNumber && (
          <p className="text-sm text-neutral-500 mb-2 font-medium">{questionNumber}</p>
        )}

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 leading-tight mb-3">
          {title}
        </h2>

        {subtitle && (
          <p className="text-base sm:text-lg lg:text-xl text-neutral-600 font-light mt-3">
            {subtitle}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="mb-6 lg:mb-8">{children}</div>

      {/* Tip - Discret */}
      {tip && (
        <div
          className={cn('mt-6 lg:mt-8 p-4 rounded-xl border backdrop-blur-sm', tipStyles[tipType])}
        >
          <p className="text-sm font-medium">
            {tipType === 'warning' && '⚠️ '}
            {tipType === 'error' && '❌ '}
            {tipType === 'info' && '💡 '}
            {tip}
          </p>
        </div>
      )}

      {/* Actions footer (si fourni) */}
      {actions && <div className="mt-8 lg:mt-10">{actions}</div>}
    </div>
  );
}
