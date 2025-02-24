'use client';

import { Checkbox, SelectSearch } from '@/components';
import { Input } from '@/components';
import { Button } from '@/components/Button';
import Stepper from '@/components/Stepper/Stepper';
import { cn } from '@/lib/utils';
import {
  Austrialia,
  Columbia,
  Haas,
  Harvard,
  Kellogg,
  Said,
  Stern,
  Strathmore,
  Wharton,
} from '@/public/index';
import { useMask } from '@react-input/mask';
import { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type selectOption = {
  value: string;
  label: string;
  id: string;
  imageURL?: string | StaticImageData;
};

const Education = () => {
  const router = useRouter();
  const handleNavigate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('submit');
  };
  const [singleSelectedOption, setSingleSelectedOption] =
    useState<selectOption | null>(null);
  const [year, setYear] = useState('2025');
  const [graduated, setGraduated] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setYear(value);
  };

  const businessSchools: selectOption[] = [
    {
      id: 'columbia',
      value: 'columbia',
      label: 'Columbia Business School',
      imageURL: Columbia,
    },
    {
      id: 'wharton',
      value: 'wharton',
      label: 'The Wharton School',
      imageURL: Wharton,
    },
    {
      id: 'harvard',
      value: 'harvard',
      label: 'Harvard Business School',
      imageURL: Harvard,
    },
    {
      id: 'kellogg',
      value: 'kellogg',
      label: 'Kellogg School of Management',
      imageURL: Kellogg,
    },
    {
      id: 'stern',
      value: 'stern',
      label: 'Stern School of Business',
      imageURL: Stern,
    },
    {
      id: 'said',
      value: 'said',
      label: 'Saïd Business School',
      imageURL: Said,
    },
    {
      id: 'agsm',
      value: 'agsm',
      label: 'Australian Graduate School of Management',
      imageURL: Austrialia,
    },
    {
      id: 'haas',
      value: 'haas',
      label: 'Haas School of Business',
      imageURL: Haas,
    },
    {
      id: 'strathmore',
      value: 'strathmore',
      label: 'Strathmore Business School',
      imageURL: Strathmore,
    },
  ];

  const handleSingleSelect = (option: selectOption | null) => {
    setSingleSelectedOption(option);
  };
  const inputRef = useMask({
    mask: '20DD',
    replacement: { D: /\d/ },
  });
  console.log(graduated, singleSelectedOption, year);
  return (
    <div className="flex h-full items-center justify-center overflow-y-auto md:min-h-[calc(100vh-54px)]">
      <div className="h-full py-5 md:py-3">
        <div className="flex w-full flex-col items-center justify-center overflow-y-auto overflow-x-hidden md:min-h-[calc(100vh-54px)] lg:w-[800px] lg:overflow-y-hidden">
          <Stepper />
          <form
            className="w-full px-5 lg:max-w-[800px]"
            onSubmit={handleNavigate}
          >
            <h1 className="mb-[35px] text-4xl font-bold">
              Which school did you (or do you) attend?
            </h1>
            <label className="mb-[35] text-[22px] leading-[24px]">
              You can add more credentials later.{' '}
            </label>
            <SelectSearch
              options={businessSchools}
              onChange={handleSingleSelect}
              placeholder="Choose your option"
            />
            <div className="item-center mt-[35px] flex flex-col gap-[45px] md:flex-row">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={graduated === 'past'}
                  id="past"
                  value="past"
                  name="graduated"
                  checkboxSize={'lg'}
                  onChange={e => setGraduated(e.target.value)}
                />
                <label
                  htmlFor="past"
                  className={cn(
                    'text-2xl font-bold',
                    graduated === 'past'
                      ? 'text-primary-900'
                      : 'text-primary-300',
                  )}
                >
                  I have graduated
                </label>
              </div>
              <div className="flex items-center gap-2">
                {' '}
                <Checkbox
                  checked={graduated === 'future'}
                  value="future"
                  id="future"
                  name="graduated"
                  checkboxSize={'lg'}
                  onChange={e => setGraduated(e.target.value)}
                />
                <label
                  htmlFor="future"
                  className={cn(
                    'text-2xl font-bold',
                    graduated === 'future'
                      ? 'text-primary-900'
                      : 'text-primary-300',
                  )}
                >
                  I will graduated{' '}
                </label>
                <Input
                  disabled={graduated !== 'future'}
                  ref={inputRef}
                  required
                  onChange={handleChange}
                  inputSize="md"
                  className="max-w-[85px] text-center"
                  type="number"
                  pattern="\d{1,4}"
                  defaultValue={2025}
                  maxLength={4}
                />
              </div>
            </div>
            <Button
              disabled={
                !singleSelectedOption?.value ||
                graduated === '' ||
                (graduated === 'future' && year.length < 4)
              }
              size={'md'}
              variant={
                !singleSelectedOption?.value ||
                graduated === '' ||
                (graduated === 'future' && year.length < 4)
                  ? 'gray'
                  : 'black'
              }
              className="mt-[40px]"
              type="submit"
            >
              {'Continue'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Education;
