import React, { useState } from 'react';

import EmailForm from '../EmailForm/EmailForm';
import HearAboutUsForm from '../HearAboutUsForm/HearAboutUsForm';
import OtpForm from '../OtpForm/OtpForm';

const SubmitForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(1, prev - 1));

  return (
    <div>
      {step === 1 && <HearAboutUsForm nextStep={nextStep} />}
      {step === 2 && <EmailForm nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <OtpForm prevStep={prevStep} />}
    </div>
  );
};

export default SubmitForm;
