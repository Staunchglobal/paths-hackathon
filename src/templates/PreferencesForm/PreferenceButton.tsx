import React from 'react';

interface PreferenceButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const PreferenceButton: React.FC<PreferenceButtonProps> = ({
  label,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-max rounded-lg border px-3 py-2 text-sm font-semibold transition ${
        isSelected ? 'bg-black text-white' : 'bg-white hover:bg-primary-50'
      }`}
    >
      {label}
    </button>
  );
};

export default PreferenceButton;
