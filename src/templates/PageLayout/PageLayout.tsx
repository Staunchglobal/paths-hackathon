import React, { ReactNode } from 'react';

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      {children}
    </main>
  );
};

export default PageLayout;
