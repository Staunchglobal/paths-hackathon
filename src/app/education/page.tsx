'use client';

import { Checkbox, SelectSearch } from '@/components';
import { Input } from '@/components';
import { Button } from '@/components/Button';
import Stepper from '@/components/Stepper/Stepper';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

type selectOption = {
  value: string;
  label: string;
  id: string;
  imageURL?: string;
};

const Education = () => {
  const [singleSelectedOption, setSingleSelectedOption] =
    useState<selectOption | null>(null);
  const [year, setYear] = useState('');
  const [graduated, setGraduated] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;

    if (!/^\d*$/.test(value)) return;

    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    if (value.length === 4 && Number(value) < 2025) {
      value = '2025';
    }

    setYear(value);
  };

  const businessSchools: selectOption[] = [
    {
      id: 'columbia',
      value: 'columbia',
      label: 'Columbia Business School',
      imageURL:
        'https://www.google.com/imgres?q=columbia%20business%20school%20icon%20url&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2Ff%2Ff3%2FColumbia_Business_School_logo.svg%2F1200px-Columbia_Business_School_logo.svg.png&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FColumbia_Business_School&docid=Hkbg2HeiSnzCQM&tbnid=UuB06S_1oFaoqM&vet=12ahUKEwjzvsigz9yLAxV0SvEDHTI6MWIQM3oECGUQAA..i&w=1200&h=1206&hcb=2&ved=2ahUKEwjzvsigz9yLAxV0SvEDHTI6MWIQM3oECGUQAA',
    },
    {
      id: 'wharton',
      value: 'wharton',
      label: 'The Wharton School',
      imageURL: 'https://example.com/images/wharton-logo.png',
    },
    {
      id: 'harvard',
      value: 'harvard',
      label: 'Harvard Business School',
      imageURL: 'https://example.com/images/harvard-logo.png',
    },
    {
      id: 'kellogg',
      value: 'kellogg',
      label: 'Kellogg School of Management',
      imageURL: 'https://example.com/images/kellogg-logo.png',
    },
    {
      id: 'stern',
      value: 'stern',
      label: 'Stern School of Business',
      imageURL: 'https://example.com/images/stern-logo.png',
    },
    {
      id: 'said',
      value: 'said',
      label: 'Saïd Business School',
      imageURL: 'https://example.com/images/said-logo.png',
    },
    {
      id: 'agsm',
      value: 'agsm',
      label: 'Australian Graduate School of Management',
      imageURL: 'https://example.com/images/agsm-logo.png',
    },
    {
      id: 'haas',
      value: 'haas',
      label: 'Haas School of Business',
      imageURL: 'https://example.com/images/haas-logo.png',
    },
    {
      id: 'strathmore',
      value: 'strathmore',
      label: 'Strathmore Business School',
      imageURL: 'https://example.com/images/strathmore-logo.png',
    },
  ];

  const handleSingleSelect = (option: selectOption | null) => {
    setSingleSelectedOption(option);
  };

  return (
    <div className="flex h-full items-center justify-center overflow-y-auto md:min-h-[calc(100vh-54px)]">
      <div className="py-5 md:py-2">
        {/* <div className="flex w-full flex-col items-center justify-center lg:w-[800px]">
          <Stepper />
           
            <SelectSearch
              options={items}
              selected={singleSelectedOption}
              onChange={handleSingleSelect}
              placeholder="Choose your option"
              label="Single Select"
              name="singleSelect"
            />
          </div>
        </div> */}
        <div className="flex w-full flex-col items-center justify-center lg:w-[800px]">
          <Stepper />
          <form className="w-full max-w-[800px]">
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
            <div className="item-center mt-[35px] flex gap-[45px]">
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
                !singleSelectedOption?.id ||
                !graduated ||
                graduated === 'future' ||
                !year
              }
              size={'md'}
              variant={
                !singleSelectedOption?.id ||
                !graduated ||
                graduated === 'future' ||
                !year
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
