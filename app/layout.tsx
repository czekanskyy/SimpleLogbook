import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UIProvider } from "@/app/context/UIContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SimpleLogbook',
  description: 'A simple pilot logbook',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <UIProvider>
          {children}
        </UIProvider>
      </body>
    </html>
  );
}
