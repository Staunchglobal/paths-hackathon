import { Input } from '@/components';
import { Button } from '@/components/Button';
import { useMultiStepForm } from '@/stores/useMultiStepForm';
import emailjs from 'emailjs-com';
import React, { useState } from 'react';

const EmailForm = ({
  nextStep,
  prevStep,
}: {
  nextStep: (value: React.SetStateAction<number>) => void;
  prevStep: (value: React.SetStateAction<number>) => void;
}) => {
  const { email, setEmail, firstName } = useMultiStepForm();
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    emailjs.send(
      'service_h8fcwh9', // Replace with your EmailJS service ID
      'template_nrlv4pd', // Replace with your EmailJS template ID
      {
        name: firstName,
        email: email,
      },
      'YRLPjeK-zIR7AsyKg', // Replace with your EmailJS public key
    );
    emailjs.send(
      'service_h8fcwh9', // Replace with your EmailJS service ID
      'template_t9c3kli', // Replace with your EmailJS template ID
      {
        name: firstName,
        email: email,
      },
      'YRLPjeK-zIR7AsyKg', // Replace with your EmailJS public key
    );
    nextStep(prev => prev + 1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Lastly, what’s your email?</h2>
        <p className="mt-3 text-gray-600">
          Don’t worry—we hate spam as much as you do.
        </p>
      </div>
      <div>
        <Input
          className="w-[630px]"
          value={email}
          type="email"
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault(); // Prevent default form submission
              handleSubmit(); // Manually trigger submit
            }
          }}
        />
        {error && <p className="mt-2 text-red-500">{error}</p>}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={'gray'}
            onClick={() => prevStep(2)}
            className="mt-10 rounded-lg text-lg font-semibold"
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="black"
            className="mt-10 rounded-lg text-lg font-semibold"
          >
            Continue
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EmailForm;
