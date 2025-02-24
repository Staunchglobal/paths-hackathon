interface AddOrganizationButtonProps {
  newPreference: string;
  setNewPreference: (value: string) => void;
  onAdd: () => void;
  onCancel: () => void;
}

const AddOrganizationButton: React.FC<AddOrganizationButtonProps> = ({
  newPreference,
  setNewPreference,
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

export default AddOrganizationButton;
