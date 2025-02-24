import React, { ChangeEvent, useEffect, useState } from 'react';

interface DebounceInputProps {
  minLength?: number;
  debounceTimeout?: number;
  className?: string;
  placeholder?: string;
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  autoComplete?: string;
  disabled?: boolean;
  loading?: boolean;
  isMulti?: boolean;
  selected?: any[] | null;
  name?: string;
}

const DebounceInput: React.FC<DebounceInputProps> = ({
  minLength = 0,
  debounceTimeout = 300,
  className = '',
  placeholder = '',
  id,
  value: initialValue = '',
  onChange,
  autoComplete = 'off',
  disabled = false,
  loading = false,
  isMulti = false,
  selected = null,
  name,
}) => {
  const [value, setValue] = useState<string>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<string>(initialValue);

  // Update internal state when prop value changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Debounce logic
  useEffect(() => {
    // Only trigger debounce if the value meets minimum length requirement
    if (value.length < minLength) {
      setDebouncedValue('');
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceTimeout);

    return () => {
      clearTimeout(handler);
    };
  }, [value, debounceTimeout, minLength]);

  // Trigger onChange when debounced value changes
  useEffect(() => {
    if (
      onChange &&
      (debouncedValue.length >= minLength || debouncedValue === '')
    ) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, minLength]);

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Compute dynamic placeholder based on component state
  const computedPlaceholder = loading
    ? 'Loading...'
    : isMulti
      ? selected?.length
        ? ''
        : placeholder
      : selected
        ? ''
        : placeholder;

  return (
    <input
      className={className}
      placeholder={computedPlaceholder}
      id={id || name}
      value={value}
      onChange={handleInputChange}
      autoComplete={autoComplete}
      disabled={disabled}
      name={name}
    />
  );
};

export default DebounceInput;
