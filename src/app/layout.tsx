import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Paths',
  description: 'Hackathon',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'container mx-auto overflow-y-auto text-primary-900'}>
        <div className="sticky top-0 bg-white px-5 py-3">
          <div className="relative inline-block">
            <h1 className="mb-0.5 text-xl font-bold tracking-tight text-black">
              PATHS
            </h1>
            <div
              className="absolute bottom-0 left-0 h-[3px] w-full"
              style={{
                background: 'linear-gradient(90deg, #FFB636, #FF4E9D, #4CB1FF)',
              }}
            ></div>
          </div>
        </div>
        <>{children}</>
      </body>
    </html>
  );
}
