import { Checkbox } from '@/components';
import { Button } from '@/components/Button';
import Link from 'next/link';
import React, { useState } from 'react';

const hearAboutUs = [
  'Friend or colleague',
  'Newsletter',
  'Google Search',
  'Career Services Office',
  'Professor or Academic Advisor',
  'LinkedIn',
  'Other',
];

const HearAboutUsForm = ({
  nextStep,
}: {
  nextStep: (value: React.SetStateAction<number>) => void;
}) => {
  const [selectedOptions, setSelectedOptions] = useState(new Set());

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(option)) {
        newSet.delete(option);
      } else {
        newSet.add(option);
      }
      return newSet;
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          What type of organizations are you interested in, [Name]?
        </h2>
        <p className="mt-3 text-gray-600">You can add more later.</p>
      </div>

      <div className="space-y-4">
        {hearAboutUs.map(option => (
          <Checkbox
            key={option}
            checkboxSize="lg"
            id={option}
            name="role"
            label={option}
            value={option}
            checked={selectedOptions.has(option)}
            onChange={() => handleCheckboxChange(option)}
          />
        ))}
      </div>
      <Button
        type="button"
        variant={'black'}
        onClick={() => nextStep(prev => prev + 1)}
        className="mt-10 rounded-lg text-lg font-semibold"
      >
        <Link href="/education">Continue</Link>
      </Button>
    </div>
  );
};

export default HearAboutUsForm;
