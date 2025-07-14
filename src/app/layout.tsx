import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/shared/components/ThemeProvider';
import ReduxProvider from '@/shared/components/ReduxProvider';
import { AppProvider, AuthProvider } from '@/contexts';
import { Suspense } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EasyLoops - Learn Programming',
  description:
    'Interactive coding challenges designed to build your programming skills systematically.',
  metadataBase: new URL('https://easyloops.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: 'https://easyloops.app',
    siteName: 'EasyLoops',
    title: 'EasyLoops - Learn Programming',
    description:
      'Interactive coding challenges designed to build your programming skills systematically.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyLoops - Learn Programming',
    description:
      'Interactive coding challenges designed to build your programming skills systematically.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ReduxProvider>
            <AuthProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <AppProvider>{children}</AppProvider>
              </Suspense>
            </AuthProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
