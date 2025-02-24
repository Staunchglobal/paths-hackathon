'use client';

// import { InformationRed, PasswordHidden, PasswordShow } from '@/assets/icons';
import { cn } from '@/lib/utils';
import { forwardRef, useState } from 'react';

import { type InputProps, inputVariants, labelSize } from './inputType';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      name,
      type,
      variant,
      inputSize,
      passwordWithIcon,

      label,
      labelStyles,

      min,
      disabled,
      isError,
      errorMessage,

      //  icon styles (majority if the time it will be used with the default style)
      ...props
    }: InputProps,
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showToggleIcon] = useState(type === 'password' && passwordWithIcon);
    // const [passwordVisible, setPasswordVisibility] = useState(false);

    return (
      <div
        className={cn(
          'relative flex flex-col gap-5',
          disabled && 'cursor-not-allowed',
        )}
      >
        {label && (
          <label
            htmlFor={name}
            id={name}
            className={cn(
              labelSize[inputSize || 'md'],
              labelStyles,
              'font-normal',
            )}
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            'flex items-center',

            inputVariants({ variant, inputSize }),

            isFocused ? 'border-primary-900' : '',
            showToggleIcon ? 'justify-between' : 'justify-start',
            isError && 'border-red-500',
            disabled && 'bg-gray-light',
            type === 'date' ? 'py-[7px]' : '',
            className,
          )}
        >
          {/* {leftIcon && (
            <img
              className={cn(leftIconStyles, disabled && 'opacity-30')}
              src={leftIcon}
              alt={`icon_leftIcon_${name}_input`}
            />
          )} */}
          <input
            disabled={disabled}
            min={min}
            className={cn(
              'disabled:bg-gray-light w-full bg-white autofill:!bg-white focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-30',
              className,
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            ref={ref}
            {...props}
          />
          {/* {showToggleIcon && (
            <img
              src={passwordVisible ? PasswordShow : PasswordHidden}
              className={cn(rightIconStyles, disabled && 'opacity-30')}
              alt="password_icon"
              onClick={() => setPasswordVisibility(prev => !prev)}
            />
          )} */}
          {/* {rightIcon && (
            <img
              className={cn(rightIconStyles, disabled && 'opacity-30')}
              src={rightIcon}
              alt={`icon_right_${name}_input`}
            />
          )} */}
        </div>

        {isError && errorMessage && (
          <div className="absolute bottom-[-24px]">
            <div className="flex items-center gap-1">
              {/* <img src={InformationRed} /> */}
              <p className="text-xs text-red-500">{errorMessage}</p>
            </div>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
