// src/components/questionnaire/inputs/OptionCard.tsx
'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface OptionCardProps {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  selected: boolean;
  onChange: (id: string) => void;
  type: 'radio' | 'checkbox';
  disabled?: boolean;
}

export default function OptionCard({
  id,
  label,
  description,
  icon,
  selected,
  onChange,
  type,
  disabled = false,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(id)}
      disabled={disabled}
      className={cn(
        'text-left transition-all duration-150',
        'flex items-start gap-3 py-3 px-4 rounded-lg',
        'hover:bg-neutral-50',
        'max-w-2xl', // ← Limite la largeur max
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {/* Hidden input */}
      <input
        type={type}
        name={type === 'radio' ? 'option-group' : undefined}
        checked={selected}
        onChange={() => onChange(id)}
        className="sr-only"
        disabled={disabled}
      />

      {/* Checkbox ou Radio */}
      <div className="flex-shrink-0 mt-0.5">
        {type === 'checkbox' ? (
          <div
            className={cn(
              'w-5 h-5 rounded border-2 transition-all duration-150 flex items-center justify-center',
              selected
                ? 'bg-neutral-900 border-neutral-900'
                : 'bg-white border-neutral-300 hover:border-neutral-400'
            )}
          >
            {selected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
          </div>
        ) : (
          <div
            className={cn(
              'w-5 h-5 rounded-full border-2 transition-all duration-150 flex items-center justify-center',
              selected
                ? 'bg-neutral-900 border-neutral-900'
                : 'bg-white border-neutral-300 hover:border-neutral-400'
            )}
          >
            {selected && <div className="w-2 h-2 rounded-full bg-white" />}
          </div>
        )}
      </div>

      {/* Icône emoji (optionnel) */}
      {icon && <div className="flex-shrink-0 text-xl mt-0.5">{icon}</div>}

      {/* Contenu texte */}
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            'text-base transition-all duration-150',
            selected ? 'font-semibold text-neutral-950' : 'font-normal text-neutral-900'
          )}
        >
          {label}
        </div>

        {description && (
          <div className="text-sm text-neutral-500 mt-0.5 leading-snug">{description}</div>
        )}
      </div>
    </button>
  );
}
