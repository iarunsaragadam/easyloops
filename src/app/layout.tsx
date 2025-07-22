import type { Metadata } from 'next';
import { Geist, Geist_Mono, Comfortaa } from 'next/font/google';
import './globals.css';
import { AdvancedThemeProvider } from '@/shared';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const comfortaa = Comfortaa({
  variable: '--font-comfortaa',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'easyloops - Learn Programming',
  description:
    'Interactive coding challenges designed to build your programming skills systematically.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.variable} antialiased`}
      >
        <AdvancedThemeProvider>{children}</AdvancedThemeProvider>
      </body>
    </html>
  );
}
