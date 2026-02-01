// src/components/questionnaire/inputs/RadioGroup.tsx
'use client';

import { ReactNode } from 'react';
import OptionCard from './OptionCard';

export interface RadioOption {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string | null;
  onChange: (value: string) => void;
  name?: string;
}

export default function RadioGroup({
  options,
  value,
  onChange,
  name = 'radio-group',
}: RadioGroupProps) {
  return (
    <div className="space-y-2 max-w-2xl" role="radiogroup" aria-label={name}>
      {/* ↑ Limite la largeur du groupe */}
      {options.map(option => (
        <OptionCard
          key={option.id}
          id={option.id}
          label={option.label}
          description={option.description}
          icon={option.icon}
          selected={value === option.id}
          onChange={onChange}
          type="radio"
          disabled={option.disabled}
        />
      ))}
    </div>
  );
}
