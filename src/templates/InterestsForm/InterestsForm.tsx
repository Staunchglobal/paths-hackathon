import { Checkbox } from '@/components';
import { Button } from '@/components/Button';
import { useMultiStepForm } from '@/stores/useMultiStepForm';
import React from 'react';

import AddPreferenceForm from '../PreferencesForm/AddPreferenceForm';
import PreferenceButton from '../PreferencesForm/PreferenceButton';

const InterestForm = ({
  nextStep,
}: {
  nextStep: (value: React.SetStateAction<number>) => void;
}) => {
  const {
    preferencesList,
    selectedPreferences,
    showInput,
    newPreference,
    selectedCategory,
    setShowInput,
    setNewPreference,
    setSelectedCategory,
    handleValueToggle,
    handlePreferenceToggle,
    handleAddPreference,
  } = useMultiStepForm();

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h2 className="text-3xl font-bold">
        What projects are you interested in?
      </h2>
      <p className="mt-3 text-gray-600">Select as many as you like</p>

      <div className="pb- mt-10 flex flex-wrap gap-4">
        {preferencesList.map(({ title, values }) => (
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
        {preferencesList.flatMap(({ title, values }) =>
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
            categories={preferencesList.map(p => p.title)}
            setNewPreference={setNewPreference}
            setSelectedCategory={setSelectedCategory}
            onAdd={handleAddPreference}
            onCancel={() => setShowInput(false)}
          />
        )}
      </div>
      <Button
        onClick={() => nextStep(prev => prev + 1)}
        variant={'black'}
        className="mt-10 rounded-lg text-lg font-semibold"
      >
        Continue
      </Button>
    </div>
  );
};

export default InterestForm;
