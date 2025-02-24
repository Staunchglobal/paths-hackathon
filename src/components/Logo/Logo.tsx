import React from 'react';

const Logo = () => {
  return (
    <div className="relative inline-block">
      <h1 className="mb-0.5 text-xl font-bold tracking-tight text-black">
        PATHS
      </h1>
      <div
        className="absolute bottom-0 left-0 h-1.5 w-full"
        style={{
          background: 'linear-gradient(90deg, #FFB636, #FF4E9D, #4CB1FF)',
        }}
      ></div>
    </div>
  );
};

export default Logo;
