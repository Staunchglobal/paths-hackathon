import React from 'react';

interface AddPreferenceFormProps {
  newPreference: string;
  selectedCategory: string;
  categories: string[];
  setNewPreference: (value: string) => void;
  setSelectedCategory: (value: string) => void;
  onAdd: () => void;
  onCancel: () => void;
}

const AddPreferenceForm: React.FC<AddPreferenceFormProps> = ({
  newPreference,
  selectedCategory,
  categories,
  setNewPreference,
  setSelectedCategory,
  onAdd,
  onCancel,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        type="text"
        value={newPreference}
        onChange={e => setNewPreference(e.target.value)}
        placeholder="Enter preference..."
        className="w-48 rounded-lg border px-3 py-2 text-sm"
      />
      <select
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
        className="rounded-lg border px-2 py-2 text-sm"
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button
        onClick={onAdd}
        className="bg-primary rounded-lg px-3 py-2 text-sm text-black"
      >
        Add
      </button>
      <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
        ✕
      </button>
    </div>
  );
};

export default AddPreferenceForm;
