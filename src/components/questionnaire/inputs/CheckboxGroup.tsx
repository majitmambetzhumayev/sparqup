// src/components/questionnaire/inputs/CheckboxGroup.tsx
'use client';

import { ReactNode } from 'react';
import OptionCard from './OptionCard';

export interface CheckboxOption {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  value: string[];
  onChange: (value: string[]) => void;
  maxSelections?: number;
  exclusiveOptions?: string[];
}

export default function CheckboxGroup({
  options,
  value,
  onChange,
  maxSelections,
  exclusiveOptions = [],
}: CheckboxGroupProps) {
  const handleToggle = (id: string) => {
    // Si option exclusive (ex: "Rien de tout ça")
    if (exclusiveOptions.includes(id)) {
      if (value.includes(id)) {
        onChange([]);
      } else {
        onChange([id]);
      }
      return;
    }

    // Si une option exclusive est sélectionnée, on la retire
    const newValue = value.filter(v => !exclusiveOptions.includes(v));

    // Toggle de l'option
    if (newValue.includes(id)) {
      onChange(newValue.filter(v => v !== id));
    } else {
      if (maxSelections && newValue.length >= maxSelections) {
        return;
      }
      onChange([...newValue, id]);
    }
  };

  return (
    <div className="space-y-2 max-w-2xl">
      {options.map(option => {
        const isDisabled: boolean =
          option.disabled === true ||
          (maxSelections !== undefined &&
            value.length >= maxSelections &&
            !value.includes(option.id));

        return (
          <OptionCard
            key={option.id}
            id={option.id}
            label={option.label}
            description={option.description}
            icon={option.icon}
            selected={value.includes(option.id)}
            onChange={handleToggle}
            type="checkbox"
            disabled={isDisabled}
          />
        );
      })}

      {/* Info max selections */}
      {maxSelections && (
        <p className="text-sm text-neutral-500 mt-3 pl-8">
          {value.length} / {maxSelections} sélection{maxSelections > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
