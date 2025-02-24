'use client';

import { Checkbox } from '@/components';
import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

export default function JoinFrom() {
  const [checked, setChecked] = useState('');

  return (
    <div className="flex h-full items-center justify-center overflow-y-auto md:h-[calc(100vh-54px)]">
      <div className="py-5 md:py-0">
        <div className="flex items-center justify-center">
          <h1
            className="text-center text-[45px] font-extrabold sm:text-[60px]"
            style={{ fontFamily: 'Arial' }}
          >
            Join as a client or talent
          </h1>
        </div>
        <div className="mt-[30px] flex flex-col items-center justify-center gap-[25px] px-5 md:mt-[91px] md:flex-row">
          <label
            htmlFor="client"
            className={cn(
              'flex min-h-[277px] w-full max-w-[477px] cursor-pointer flex-col gap-9 rounded-xl border-2 p-8 transition duration-300 ease-in-out hover:bg-primary-50',
              checked === 'client'
                ? 'border-primary-900'
                : 'border-primary-200',
            )}
          >
            <div className="flex items-center justify-between">
              <span
                role="img"
                className="text-[30px] md:text-[45px]"
                aria-label="rocket"
              >
                {' '}
                🚀
              </span>
              <Checkbox
                checked={checked === 'client'}
                id="client"
                name="role"
                value="client"
                checkboxSize={'xl'}
                onChange={e => setChecked(e.target.value)}
              />
            </div>
            <h2 className="text-[24px] font-medium leading-[38px] md:text-[32px]">
              I’m a client, hiring for a project
            </h2>
          </label>
          <label
            htmlFor="talent"
            className={cn(
              'flex min-h-[277px] w-full max-w-[477px] cursor-pointer flex-col gap-9 rounded-xl border-2 p-8 transition duration-300 ease-in-out hover:bg-primary-50',
              checked === 'talent'
                ? 'border-primary-900'
                : 'border-primary-200',
            )}
          >
            <div className="flex items-center justify-between">
              <span
                role="img"
                className="text-[30px] md:text-[45px]"
                aria-label="male technologist"
              >
                {' '}
                👨‍💻
              </span>

              <Checkbox
                id="talent"
                name="role"
                checked={checked === 'talent'}
                value="talent"
                checkboxSize={'xl'}
                onChange={e => setChecked(e.target.value)}
              />
            </div>
            <h2 className="text-[24px] font-medium leading-[38px] md:text-[32px]">
              I’m talent, looking for the projects
            </h2>
          </label>
        </div>
        <div className="mt-[35px] flex items-center justify-center md:mt-[66px]">
          <Link href="/preferences">
            <Button variant={checked ? 'black' : 'gray'} size={'xxl'}>
              {checked
                ? checked === 'talent'
                  ? 'Join as  Talent'
                  : 'Join as a Client'
                : 'Create Account'}
            </Button>
          </Link>
        </div>

        <div className="mt-[35px] flex items-center justify-center text-center md:mt-[66px]">
          <p className="mr-2 text-xl font-medium">Already have an account? </p>
          <div className="relative">
            <p className="text-xl font-bold">Login</p>
            <div
              className="absolute bottom-0 left-0 h-[3px] w-full"
              style={{
                background: 'linear-gradient(90deg, #FFB636, #FF4E9D, #4CB1FF)',
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
