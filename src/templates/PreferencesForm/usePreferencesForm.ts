import { useState } from 'react';

import { preferencesData } from './preferencesData';

export const usePreferencesForm = () => {
  const [selectedPreferences, setSelectedPreferences] = useState<
    Record<string, string[]>
  >({});

  const [preferences, setPreferences] = useState(preferencesData);

  const [newPreference, setNewPreference] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showInput, setShowInput] = useState(false);

  // Toggle individual preference
  const handleValueToggle = (title: string, value: string) => {
    setSelectedPreferences(prev => {
      const currentValues = new Set(prev[title] || []);
      if (currentValues.has(value)) {
        currentValues.delete(value);
      } else {
        currentValues.add(value);
      }

      return currentValues.size
        ? { ...prev, [title]: Array.from(currentValues) }
        : (() => {
            const updated = { ...prev };
            delete updated[title];
            return updated;
          })();
    });
  };

  // Toggle all preferences under a category
  const handlePreferenceToggle = (title: string) => {
    setSelectedPreferences(prev => {
      const allSelected =
        preferences.find(p => p.title === title)?.values || [];
      const currentlySelected = new Set(prev[title] || []);

      return currentlySelected.size === allSelected.length
        ? { ...prev, [title]: [] }
        : { ...prev, [title]: allSelected };
    });
  };

  // Add a new preference
  const handleAddPreference = () => {
    if (!newPreference.trim()) return;
    const category = selectedCategory || 'Custom';

    setPreferences(prev => {
      const updated = [...prev];
      const existingCategory = updated.find(p => p.title === category);

      if (existingCategory) {
        if (!existingCategory.values.includes(newPreference)) {
          existingCategory.values = [...existingCategory.values, newPreference];
        }
      } else {
        updated.push({ title: category, values: [newPreference] });
      }

      return updated;
    });

    setSelectedPreferences(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), newPreference],
    }));

    setNewPreference('');
    setSelectedCategory('');
    setShowInput(false);
  };

  return {
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
  };
};
