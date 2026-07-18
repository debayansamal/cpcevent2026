import type { Metadata } from "next";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "CPC Cyber-Tech Startup Challenge 2026",
  description: "The CPC Cyber-Tech Startup Challenge is a multi-stage event testing the entrepreneurial mindset, adaptability, negotiation skills, and presentation capabilities of participants in a cybersecurity-themed simulation.",
};

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
