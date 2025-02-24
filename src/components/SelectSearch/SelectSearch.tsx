'use client';

import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

// Define the option type with support for images
// export interface SelectOption {
//   id: string;
//   label: string;
//   value: string;
//   imageURL?: StaticImageData;
// }
type SelectOption = {
  value: string;
  label: string;
  id: string;
  imageURL?: string | StaticImageData;
};

interface SingleSelectSearchProps {
  options: SelectOption[];
  placeholder?: string;
  onChange?: (selected: SelectOption | null) => void;
  value?: SelectOption | null;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  noOptionsMessage?: string;
}

const SingleSelectSearch: React.FC<SingleSelectSearchProps> = ({
  options,
  onChange,
  value = null,
  disabled = false,
  className = '',
  inputClassName = '',
  optionClassName = '',
  noOptionsMessage = 'No options found',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredOptions, setFilteredOptions] =
    useState<SelectOption[]>(options);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    value,
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredOptions(filtered);
    }
  }, [searchTerm, options]);

  // Update internal state when value prop changes
  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle option selection
  const handleSelectOption = (option: SelectOption) => {
    setSelectedOption(option);
    setSearchTerm('');
    setIsOpen(false);
    setIsActive(false);
    if (onChange) {
      onChange(option);
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setIsActive(!isOpen);
      if (!isOpen) {
        setSearchTerm('');
      }
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
      setIsActive(true);
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    setIsActive(true);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className} mt-[35px]`}>
      {/* Selected item display/search input */}
      <div
        className={`x-[12px] flex items-center rounded-md border py-[8px] ${
          isActive ? 'outline outline-2 outline-primary-900' : ''
        } bg-white ${
          disabled ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer'
        } ${inputClassName}`}
        onClick={toggleDropdown}
      >
        {selectedOption && !isOpen ? (
          <div className="flex w-full items-center p-2">
            {selectedOption.imageURL && (
              <Image
                src={selectedOption.imageURL}
                alt={selectedOption.label}
                height={'24'}
                width={'24'}
                className="mr-2 h-6 w-6 rounded-full object-cover"
              />
            )}
            <span className="flex-grow truncate">{selectedOption.label}</span>
            <button
              onClick={e => {
                e.stopPropagation();
                setSelectedOption(null);
                if (onChange) onChange(null);
              }}
              className="p-1 text-gray-400 hover:text-gray-600"
              disabled={disabled}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onClick={e => e.stopPropagation()}
            placeholder={selectedOption ? selectedOption.label : 'Type here'}
            className="w-full bg-transparent px-[12px] py-[8px] text-[22px] leading-[24px] outline-none"
            disabled={disabled}
          />
        )}
        {/* <div className="px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div> */}
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div
          className={`absolute z-20 my-2 max-h-[200px] w-full overflow-y-auto rounded-md border bg-white py-1 shadow-lg`}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <div
                key={option.id}
                className={`flex cursor-pointer items-center p-2 hover:bg-gray-100 ${selectedOption?.id === option.id ? 'bg-white text-primary-900' : ''} ${optionClassName}`}
                onClick={() => handleSelectOption(option)}
              >
                {option.imageURL && (
                  <Image
                    src={option.imageURL}
                    alt={option.label}
                    height={'24'}
                    width={'24'}
                    className="mr-2 h-6 w-6 rounded-full object-cover"
                  />
                )}
                <span className="truncate">{option.label}</span>
              </div>
            ))
          ) : (
            <div className="p-2 text-center text-gray-500">
              {noOptionsMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleSelectSearch;
