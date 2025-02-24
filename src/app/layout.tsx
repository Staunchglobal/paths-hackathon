import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paths",
  description: "Hackathon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"text-primary-900 container mx-auto"}>
        <div className="px-5 py-3">
          <div className="relative inline-block">
            <h1 className="text-xl font-bold tracking-tight text-black mb-0.5">
              PATHS
            </h1>
            <div
              className="absolute bottom-0 left-0 h-1.5 w-full"
              style={{
                background: "linear-gradient(90deg, #FFB636, #FF4E9D, #4CB1FF)",
              }}
            ></div>
          </div>
        </div>
        <>{children}</>
      </body>
    </html>
  );
}
