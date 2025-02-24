import { Input } from '@/components';
import { Button } from '@/components/Button';
import React, { useState } from 'react';

const EmailForm = () => {
  const [email, setEmail] = useState('');

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Lastly, what’s your email?</h2>
        <p className="mt-3 text-gray-600">
          Don’t worry—we hate spam as much as you do.
        </p>
      </div>
      <div>
        {/* <form> */}
        <Input
          className="w-[630px]"
          value={email}
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <Button
          // type="submit"
          type="button"
          variant={'black'}
          className="mt-10 rounded-lg text-lg font-semibold"
        >
          Continue
        </Button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default EmailForm;
