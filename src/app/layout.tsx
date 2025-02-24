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
      <body className={"text-primary-900"}>{children}</body>
    </html>
  );
}
