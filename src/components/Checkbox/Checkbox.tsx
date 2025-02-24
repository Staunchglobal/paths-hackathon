'use client';

import { cn } from '@/lib/utils';
import React from 'react';

import { Label } from '../Label/Label';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  checkboxSize?: 'md' | 'lg';
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, disabled, checkboxSize = 'md', ...props }, ref) => {
    const checkboxSizeMap = {
      md: 'h-5 w-5 min-w-5',
      lg: 'w-6 h-6 min-w-6 min-h-6',
    };

    const currentCheckboxSize =
      checkboxSizeMap[checkboxSize] || checkboxSizeMap.md;

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className={cn(
            'relative cursor-pointer appearance-none rounded border border-neutral-500 bg-primary-900 bg-transparent transition-all checked:h-5 checked:w-5 checked:border-primary-500 checked:bg-transparent checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[10px] checked:after:w-[5px] checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:rotate-45 checked:after:border-b-2 checked:after:border-r-2 checked:after:border-primary-900 checked:after:transition-all',
            currentCheckboxSize,
          )}
          {...props}
        />
        {label && (
          <Label
            disabled={disabled}
            htmlFor={id}
            size={checkboxSize}
            className="cursor-pointer"
          >
            {label}
          </Label>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
