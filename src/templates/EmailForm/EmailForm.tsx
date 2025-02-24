import { Input } from '@/components';
import { Button } from '@/components/Button';
import React, { useState } from 'react';

const EmailForm = ({
  nextStep,
  prevStep,
}: {
  nextStep: (value: React.SetStateAction<number>) => void;
  prevStep: (value: React.SetStateAction<number>) => void;
}) => {
  const [email, setEmail] = useState('');
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
