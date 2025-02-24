'use client';

import React, { useState } from 'react';

import InterestForm from '../InterestsForm/InterestsForm';
import OrganizationForm from '../OrganizationForm/OrganizationForm';

const PreferencesForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(1, prev - 1));

  return (
    <div className="mx-auto max-w-3xl p-6">
      {step === 1 && <InterestForm nextStep={nextStep} />}
      {step === 2 && <OrganizationForm prevStep={prevStep} />}
    </div>
  );
};

export default PreferencesForm;
