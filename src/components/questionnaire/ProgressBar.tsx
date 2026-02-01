// src/components/questionnaire/ProgressBar.tsx
'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  label?: string;
  className?: string;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  label,
  className,
}: ProgressBarProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className={cn('space-y-2', className)}>
      {/* Label */}
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-neutral-700">{label}</span>
          <span className="text-neutral-500">{percentage}%</span>
        </div>
      )}

      {/* Barre de progression */}
      <div className="relative h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-neutral-900 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
