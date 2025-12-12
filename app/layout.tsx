import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UIProvider } from "@/app/context/UIContext";
import { auth } from "@/auth";
import { getSettings } from "@/app/lib/actions";
import Footer from "@/app/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'eLogbook',
  description: 'A simple pilot logbook',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const settings = await getSettings();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`} suppressHydrationWarning>
        <UIProvider initialSettings={settings as any} user={session?.user}>
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
        </UIProvider>
      </body>
    </html>
  );
}
