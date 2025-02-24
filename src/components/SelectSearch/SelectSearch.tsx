import { Checkbox } from '@/components/Checkbox/Checkbox';
import { X } from '@/public/index';
import { useEffect, useRef, useState } from 'react';

type Option = {
  value: string | number;
  label: string;
};

type SelectSearchProps = {
  onChange: (selected: Option | Option[] | null) => void;
  placeholder?: string;
  label?: string;
  name?: string;
  loading?: boolean;
  refetch?: (params: { nameCont: string }) => void;
  isMulti?: boolean;
  icon?: string;
  required?: boolean;
  disabled?: boolean;
  removeSearch?: boolean;
  className?: string;
  options?: Array<{
    id?: string | number;
    value?: string | number;
    name?: string;
    label?: string;
    title?: string;
  }>;
  selected?: any | any[]; // Using any here as input format is flexible
};

export const SelectSearch: React.FC<SelectSearchProps> = ({
  onChange,
  placeholder = 'Select an option...',
  label,
  name,
  loading = false,
  refetch,
  isMulti = false,
  icon,
  required,
  disabled,
  removeSearch,
  className,
  options = [], // Default to empty array
  selected = isMulti ? [] : null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);

  const mapOptions = (items: any[]): Option[] =>
    items?.map(item => ({
      value: item.id || item.value,
      label: item.name || item.label || item.title,
    }));

  const items = mapOptions(options);
  const selectedOptions: Option[] = isMulti
    ? mapOptions(selected)
    : selected
      ? [selected]
      : [];

  const filteredOptions = items?.filter(({ label }) =>
    label?.toLowerCase().includes(search?.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (highlightIndex >= 0 && optionRefs.current[highlightIndex]) {
      optionRefs.current[highlightIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [highlightIndex]);

  const toggleOption = (option: Option) => {
    if (isMulti) {
      const updatedSelection = selectedOptions.some(
        s => s.value === option.value,
      )
        ? selectedOptions.filter(s => s.value !== option.value)
        : [...selectedOptions, option];
      onChange(updatedSelection);
    } else {
      onChange(option);
      setIsOpen(false);
      setSearch('');
    }
  };

  const removeOption = (optionToRemove: Option, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedSelection = selectedOptions.filter(
      option => option.value !== optionToRemove.value,
    );
    onChange(updatedSelection);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    refetch?.({ nameCont: e.target.value });
    setIsOpen(true);
    setSearch(e.target.value);
    setHighlightIndex(-1);
  };

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && e.key !== 'Backspace') {
      setIsOpen(true);
      return;
    }

    const optionsLength = filteredOptions?.length || 0;

    switch (e.key) {
      case 'ArrowDown':
      case 'Tab':
        e.preventDefault();
        setHighlightIndex(prev => (prev < optionsLength - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightIndex(prev => (prev > 0 ? prev - 1 : optionsLength - 1));
        break;
      case 'Enter':
        if (highlightIndex >= 0) {
          e.preventDefault();
          toggleOption(filteredOptions[highlightIndex]);
        }
        break;
      case 'Backspace':
        if (!search) {
          e.preventDefault();
          const updatedSelection = isMulti
            ? selectedOptions.slice(0, -1)
            : null;
          onChange(updatedSelection);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`relative focus:outline-none ${disabled ? 'pointer-events-none' : ''} ${
        className || ''
      }`}
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {label && (
        <label
          htmlFor={name}
          className={`mb-2 block text-sm font-medium ${disabled ? 'text-gray-300' : 'text-gray-700'}`}
        >
          {label}
          {required && (
            <span
              className={`ml-1 ${disabled ? 'text-gray-300' : 'text-red-500'}`}
            >
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        <div
          className={`rounded-md border bg-white px-4 py-2 ${
            disabled ? 'border-gray-100' : 'border-gray-200'
          } flex cursor-pointer items-center justify-between gap-2`}
          onClick={toggleDropdown}
        >
          {icon && (
            <img
              src={icon}
              alt="Select Icon"
              width={16}
              className={disabled ? 'opacity-50' : ''}
            />
          )}
          <div className="flex max-w-full flex-wrap items-center gap-1.5">
            {isMulti ? (
              selectedOptions.map((option, index) => (
                <span
                  key={index}
                  className={`flex flex-shrink-0 cursor-pointer items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium ${
                    disabled
                      ? 'pointer-events-none text-gray-300'
                      : 'text-gray-900'
                  }`}
                  onClick={e => removeOption(option, e)}
                >
                  {option.label}
                  <img
                    src={X}
                    alt="remove"
                    className={disabled ? 'opacity-50' : ''}
                  />
                </span>
              ))
            ) : (
              <span
                className={`flex-shrink-0 text-sm font-medium ${
                  disabled ? 'text-gray-300' : 'text-gray-900'
                }`}
              >
                {selected?.label}
              </span>
            )}

            {removeSearch ? (
              !selected && (
                <div
                  className={`${disabled ? 'text-gray-100' : 'text-gray-300'}`}
                >
                  {placeholder}
                </div>
              )
            ) : (
              <DebounceInput
                minLength={1}
                debounceTimeout={500}
                className="flex-grow-1 w-full border-0 bg-white text-sm font-normal focus:outline-none focus:ring-0"
                placeholder={
                  loading
                    ? 'Loading...'
                    : isMulti
                      ? selected?.length
                        ? ''
                        : placeholder
                      : selected
                        ? ''
                        : placeholder
                }
                id={name}
                value={search}
                onChange={handleSearchChange}
                autoComplete="off"
                disabled={disabled}
              />
            )}
          </div>
          <svg
            className={`h-4 w-4 ${disabled ? 'text-gray-300' : 'text-gray-900'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
            />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-md border border-gray-100 bg-white shadow-lg">
            {loading ? (
              <div className="p-4 text-sm font-normal">Loading...</div>
            ) : filteredOptions?.length > 0 ? (
              filteredOptions?.map((option, index) =>
                isMulti ? (
                  <label
                    key={option.value}
                    htmlFor={`option-${index}`}
                    className={`block cursor-pointer p-3 text-sm hover:bg-gray-100 ${
                      highlightIndex === index ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => containerRef.current?.focus()}
                  >
                    <CheckField
                      type="checkbox"
                      id={`option-${index}`}
                      label={option.label}
                      checked={selectedOptions.some(
                        s => s.value === option.value,
                      )}
                      onChange={() => toggleOption(option)}
                    />
                  </label>
                ) : (
                  <div
                    key={option.value}
                    className={`block cursor-pointer p-3 text-sm hover:bg-gray-100 ${
                      highlightIndex === index ? 'bg-gray-100' : ''
                    } ${
                      selected?.value === option?.value ? 'bg-blue-100' : ''
                    }`}
                    ref={el => (optionRefs.current[index] = el)}
                    onClick={() => toggleOption(option)}
                  >
                    {option.label}
                  </div>
                ),
              )
            ) : (
              <div className="p-4 text-sm font-normal">No options found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
