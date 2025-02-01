import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DotPattern } from "../components/ui/dot-pattern"; // Import the DotPattern
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FS Rules Checklist",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col items-center justify-center mx-auto mt-6 mb-20 min-h-screen relative`}
      >
        {/* DotPattern applied globally */}
        <div className="absolute inset-0 z-0">
          <DotPattern
            className="absolute inset-0 w-full h-full" // Temporary background to see if it's rendering
          />
        </div>

        {/* Main content */}
        <main className="relative flex-auto min-w-0 flex flex-col px-6 sm:px-4 md:px-0 max-w-[1024px] z-10">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
