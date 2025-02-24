import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/public/index';
import { type VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium !leading-[1.35] outline-none transition-colors focus:outline-none focus-visible:outline-none active:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  ),
  {
    variants: {
      variant: {
        default:
          'border border-primary-500 bg-primary-500 text-white hover:border-primary-600 hover:bg-primary-600 focus:ring-primary-300 active:border-primary-700 active:bg-primary-700',
        black:
          'border border-black bg-black text-white hover:border-neutral-800 hover:bg-neutral-800 focus:ring-neutral-300 active:border-black active:bg-black',
        outline:
          'border-input bg-background border border-neutral-200 hover:bg-neutral-50 focus:ring-neutral-100 active:bg-neutral-100',
        link: '!p-0 text-primary-500 underline underline-offset-4 hover:text-primary-600 focus:ring-0',
      },
      size: {
        default: 'px-6 py-2 text-xs',
        md: 'px-6 py-2 text-sm',
        lg: 'px-8 py-3 text-base',
        xl: 'px-8 py-4 text-[18px]',
        xxl: 'px-8 py-4 text-[20px] font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      disabled,
      children,
      loading,
      loadingText,
      ...props
    },
    ref,
  ) => {
    const Comp = 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && 'cursor-not-allowed',
        )}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <LoadingSpinner />
            {loadingText}
          </span>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
