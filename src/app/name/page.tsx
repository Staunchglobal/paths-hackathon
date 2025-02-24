'use client';

import { Input } from '@/components';
import { Button } from '@/components/Button';
import { useMultiStepForm } from '@/stores/useMultiStepForm';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Name = () => {
  const router = useRouter();
  const { firstName, setFirstName } = useMultiStepForm();

  const handleNavigate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('preferences');
  };

  const [name, setName] = useState('');
  return (
    <div className="flex h-full items-center justify-center overflow-y-auto md:min-h-[calc(100vh-54px)]">
      <div className="py-5 md:py-2">
        <div className="flex items-center justify-center">
          <form onSubmit={handleNavigate}>
            <h1 className="mb-[40px] text-4xl font-bold">
              First, what’s your name?
            </h1>

            <Input
              placeholder="Type your name"
              label="First name"
              inputSize={'lg'}
              value={firstName}
              name="name"
              maxLength={40}
              required
              onChange={e => {
                setFirstName(e.target.value);
                setName(e.target.value);
              }}
            />
            <Button
              disabled={!name}
              size={'md'}
              variant={name ? 'black' : 'gray'}
              className="mt-[40px]"
              type="submit"
            >
              {'Continue'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Name;
