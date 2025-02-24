import { Checkbox } from '@/components';
import { Button } from '@/components/Button';
import Link from 'next/link';
import React from 'react';

import AddPreferenceForm from './AddPreferenceForm';
import PreferenceButton from './PreferenceButton';
import { usePreferencesForm } from './usePreferencesForm';

const PreferencesForm = () => {
  const {
    selectedPreferences,
    preferences,
    newPreference,
    selectedCategory,
    showInput,
    setShowInput,
    setNewPreference,
    setSelectedCategory,
    handleValueToggle,
    handlePreferenceToggle,
    handleAddPreference,
  } = usePreferencesForm();

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h2 className="text-3xl font-bold">
        What projects are you interested in?
      </h2>
      <p className="mt-3 text-gray-600">Select as many as you like</p>

      <div className="pb- mt-10 flex flex-wrap gap-4">
        {preferences.map(({ title, values }) => (
          <Checkbox
            key={title}
            id={title}
            label={title}
            checked={selectedPreferences[title]?.length === values.length}
            onChange={() => handlePreferenceToggle(title)}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {preferences.flatMap(({ title, values }) =>
          values.map(value => (
            <PreferenceButton
              key={`${title}-${value}`}
              label={value}
              isSelected={selectedPreferences[title]?.includes(value)}
              onClick={() => handleValueToggle(title, value)}
            />
          )),
        )}
        {!showInput ? (
          <button
            onClick={() => setShowInput(true)}
            className="rounded-lg border px-3 py-2 text-sm font-semibold"
          >
            + Add new
          </button>
        ) : (
          <AddPreferenceForm
            newPreference={newPreference}
            selectedCategory={selectedCategory}
            categories={preferences.map(p => p.title)}
            setNewPreference={setNewPreference}
            setSelectedCategory={setSelectedCategory}
            onAdd={handleAddPreference}
            onCancel={() => setShowInput(false)}
          />
        )}
      </div>
      <Button
        variant={'black'}
        className="mt-10 rounded-lg text-lg font-semibold"
      >
        <Link href="/organization">Continue</Link>
      </Button>
    </div>
  );
};

export default PreferencesForm;
