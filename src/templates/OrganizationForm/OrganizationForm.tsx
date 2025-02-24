'use client';

import { Checkbox } from '@/components';
import { Button } from '@/components/Button';
import { useMultiStepForm } from '@/stores/useMultiStepForm';
import Link from 'next/link';
import React, { useState } from 'react';

import PreferenceButton from '../PreferencesForm/PreferenceButton';
import AddOrganizationButton from './AddOrganizationButton';

const OrganizationForm = ({
  prevStep,
}: {
  prevStep: (value: React.SetStateAction<number>) => void;
}) => {
  const {
    organizations,
    selectedOrganizations,
    selectAll,
    setOrganizations,

    toggleOrganizationSelection,
    toggleSelectAllOrganizations,
  } = useMultiStepForm();
  const [showInput, setShowInput] = useState(false);
  const [newPreference, setNewPreference] = useState('');

  const handleAddPreference = () => {
    if (newPreference.trim() !== '') {
      setOrganizations([...organizations, newPreference]);
      setNewPreference('');
      setShowInput(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          What type of organizations are you interested in, [Name]?
        </h2>
        <p className="mt-3 text-gray-600">You can add more later. </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {organizations.map(value => (
          <PreferenceButton
            key={value}
            label={value}
            isSelected={selectedOrganizations.includes(value)}
            onClick={() => toggleOrganizationSelection(value)}
          />
        ))}

        {!showInput ? (
          <button
            onClick={() => setShowInput(true)}
            className="rounded-lg border px-3 py-2 text-sm font-semibold"
          >
            + Add new
          </button>
        ) : (
          <AddOrganizationButton
            newPreference={newPreference}
            setNewPreference={setNewPreference}
            onAdd={handleAddPreference}
            onCancel={() => setShowInput(false)}
          />
        )}
      </div>
      <div className="mt-10">
        <Checkbox
          type="checkbox"
          id="selectAll"
          label="Select All"
          checked={selectAll}
          onChange={toggleSelectAllOrganizations}
        />
      </div>
      <div className="mt-10 flex items-center gap-2">
        <Button
          type="button"
          variant={'gray'}
          onClick={() => prevStep(1)}
          className="rounded-lg text-lg font-semibold"
        >
          Back
        </Button>
        <Button variant={'black'} className="rounded-lg text-lg font-semibold">
          <Link href="/education">Continue</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrganizationForm;
