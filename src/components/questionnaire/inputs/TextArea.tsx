// src/components/questionnaire/inputs/TextArea.tsx
'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helpText?: string;
  charCount?: boolean;
  maxLength?: number;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helpText, charCount, maxLength, className, required, value, ...props }, ref) => {
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className="space-y-2">
        {/* Label */}
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-neutral-950">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {/* Character count */}
          {charCount && maxLength && (
            <span className="text-xs text-neutral-500">
              {currentLength} / {maxLength}
            </span>
          )}
        </div>

        {/* Textarea */}
        <textarea
          ref={ref}
          maxLength={maxLength}
          value={value}
          className={cn(
            'w-full px-4 py-3 rounded-lg border-2 transition-all resize-none',
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

TextArea.displayName = 'TextArea';

export default TextArea;
