import React, { useEffect, useState } from 'react';

import { Button } from '../Button';

interface ResendTimerProps {
  initialTime: number; // Time in seconds
  onResend: () => void;
}

const ResendTimer: React.FC<ResendTimerProps> = ({ initialTime, onResend }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return; // Exit if timer is not running

    const timer = setTimeout(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount or timeLeft change
  }, [timeLeft]);

  const handleResend = () => {
    onResend();
    setTimeLeft(initialTime); // Reset timer
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center">
      {timeLeft > 0 ? (
        <span className="text-sm font-medium text-primary-500">
          {formatTime(timeLeft)}
        </span>
      ) : (
        <Button
          size="md"
          asChild
          variant="link"
          onClick={handleResend}
          className="cursor-pointer"
        >
          <span className="text-base">Resend Code</span>
        </Button>
      )}
    </div>
  );
};

export default ResendTimer;
