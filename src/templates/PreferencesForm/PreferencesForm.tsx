import { Checkbox } from '@/components';
import React, { useState } from 'react';

const PreferencesForm = () => {
  const [isChecked2, setIsChecked2] = useState(false);
  console.log('🚀 ~ PreferencesForm ~ isChecked2:', isChecked2);

  return (
    <div>
      <Checkbox
        id="my working"
        label="Label"
        onChange={() => setIsChecked2(!isChecked2)}
        checked={isChecked2}
        checkboxSize="lg"
      />
    </div>
  );
};

export default PreferencesForm;
