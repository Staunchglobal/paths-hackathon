'use client';

import { cn } from '@/lib/utils';
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

interface InputOTPProps {
  slots?: number;
  onChange?: (value: string) => void;
  className?: string;
  required?: boolean;
}

const InputOTP: FC<InputOTPProps> = ({
  slots = 4,
  onChange,
  className,
  required,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [inputValues, setInputValues] = useState<string[]>(
    new Array(slots).fill(''),
  );

  // Handle input change for each slot
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = event.target;

    if (/^[0-9]?$/.test(value)) {
      const newValues = [...inputValues];
      newValues[index] = value;
      setInputValues(newValues);

      // Send the combined OTP value to the parent
      onChange?.(newValues.join(''));

      // Move focus to the next input if available
      if (value && index < slots - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle Backspace key to move focus back
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === 'Backspace' && !inputValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Ensure focus starts at the first slot
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className={cn('flex justify-center space-x-2', className)}>
      {inputValues.map((_, index) => (
        <input
          required={required}
          key={index}
          ref={el => {
            inputRefs.current[index] = el;
          }}
          value={inputValues[index]}
          onChange={event => handleChange(event, index)}
          onKeyDown={event => handleKeyDown(event, index)}
          type="text"
          maxLength={1}
          className="size-12 rounded-xl border border-neutral-200 text-center focus:outline-primary-300"
        />
      ))}
    </div>
  );
};

export default InputOTP;
