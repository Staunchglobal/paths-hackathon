import { Input } from '@/components';
import { Button } from '@/components/Button';
import React from 'react';

const Name = () => {
  return (
    <div className="flex h-full items-center justify-center overflow-y-auto md:min-h-[calc(100vh-54px)]">
      <div className="py-5 md:py-2">
        <div className="flex items-center justify-center">
          <form>
            <h1 className="mb-[40px] text-4xl font-bold">
              First, what’s your name?
            </h1>

            <Input label="First name" inputSize={'lg'} name="name" required />
            <Button variant={'black'} className="mt-[40px]" type="submit">
              {'Continue'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Name;
