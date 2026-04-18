import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Flixify - Watch TV Shows Online, Watch Movies Online for free",
  description: "Watch movies & TV shows online or stream right to your PC for free",
};
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased dark"
    >
      <body className="bg-background text-foreground h-full flex flex-col overflow-hidden">
        {}
        <Navbar />

        {}
        <main className="flex-1 mt-16 overflow-y-auto px-10 py-10 custom-scrollbar animate-page-entrance">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
