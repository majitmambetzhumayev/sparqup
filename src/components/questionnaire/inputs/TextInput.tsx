// src/components/questionnaire/inputs/TextInput.tsx
'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, helpText, className, required, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {/* Label */}
        <label className="block text-sm font-semibold text-neutral-950">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {/* Input */}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-lg border-2 transition-all',
            'text-neutral-950 placeholder:text-neutral-400',
            'focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-400'
              : 'border-neutral-200 focus:border-neutral-900',
            'disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60',
            className
          )}
          {...props}
        />

        {/* Help text */}
        {helpText && !error && <p className="text-sm text-neutral-600">{helpText}</p>}

        {/* Error message */}
        {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
