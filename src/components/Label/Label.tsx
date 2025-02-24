import { cn } from '@/lib/utils';
import React from 'react';

const labelVariants =
  'text-sm font-medium text-neutral-900 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size = 'sm', disabled = false, children, ...props }, ref) => {
    const labelSizeClasses = {
      lg: 'text-base',
      md: 'text-sm',
      sm: 'text-xs',
      xl: 'text-md',
    };

    const sizeClass = labelSizeClasses[size] || labelSizeClasses.sm;
    const disabledClass = disabled ? 'opacity-60' : '';

    return (
      <label
        className={cn(labelVariants, sizeClass, disabledClass, className)}
        ref={ref}
        {...props}
      >
        {children}
      </label>
    );
  },
);

Label.displayName = 'Label';

export { Label };
