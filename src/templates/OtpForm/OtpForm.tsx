import { Button } from '@/components/Button';
import InputOTP from '@/components/InputOtp/InputOtp';
import ResendTimer from '@/components/ResendTimer/ResendTimer';
import React, { useState } from 'react';

const OtpForm = ({
  prevStep,
}: {
  prevStep: (value: React.SetStateAction<number>) => void;
}) => {
  const [otp, setOtp] = useState('');
  console.log('🚀 ~ otp:', otp);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setOtp('');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  };

  const handleOTPChange = (value: string) => {
    setOtp(value);
  };

  const handleResend = async () => {
    try {
      // Resend OTP logic
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Verify your email</h2>
        <p className="mt-3 text-gray-600">
          Enter the verification code sent to your email [insert email].
        </p>
      </div>
      <InputOTP
        slots={6}
        onChange={handleOTPChange}
        className="justify-between"
        required
      />
      <div className="mt-10">
        <div className="flex items-center justify-center gap-2">
          Didn’t receive a code?
          <ResendTimer initialTime={90} onResend={handleResend} />
        </div>
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
            variant={'black'}
            className="mt-10 rounded-lg text-lg font-semibold"
          >
            Continue
          </Button>
        </div>
      </div>
    </form>
  );
};

export default OtpForm;
