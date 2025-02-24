import { Checkbox } from '@/components';
import { Button } from '@/components/Button';
import Link from 'next/link';
import React, { useState } from 'react';

import PreferenceButton from '../PreferencesForm/PreferenceButton';
import AddOrganizationButton from './AddOrganizationButton';

const initialOrganizations = [
  'Woman-Led 👩‍✈️',
  'Artificial Intelligence 🤖',
  'Startups 🚀',
  'Disruptors 🧨',
  'Sustainable 🌳',
  'B Corp Certified ♻️',
  'Tech Unicorns 🚀',
  'Social Impact 🌎',
  'Direct-to-Consumer 🛍️',
  'FinTech 💳',
  'Lifestyle 👟',
  'Subscription-Based 🔄',
  'High Growth 📈',
  'Transformation 🦋',
  'Large Enterprise 🚂',
];

const OrganizationForm = () => {
  const [organizations, setOrganizations] = useState(initialOrganizations);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>(
    [],
  );
  const [showInput, setShowInput] = useState(false);
  const [newPreference, setNewPreference] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const handleAddPreference = () => {
    if (newPreference.trim() !== '') {
      setOrganizations([...organizations, newPreference]);
      setNewPreference('');
      setShowInput(false);
    }
  };

  const toggleSelection = (organization: string) => {
    setSelectedOrganizations(prev =>
      prev.includes(organization)
        ? prev.filter(item => item !== organization)
        : [...prev, organization],
    );
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
            onClick={() => toggleSelection(value)}
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
          label="Select All"
          checked={selectAll}
          type="checkbox"
          id="selectAll"
          onChange={() => {
            setSelectAll(!selectAll);
            setSelectedOrganizations(selectAll ? [] : [...organizations]);
          }}
        />
      </div>
      <Button
        variant={'black'}
        className="mt-10 rounded-lg text-lg font-semibold"
      >
        <Link href="/education">Continue</Link>
      </Button>
    </div>
  );
};

export default OrganizationForm;
