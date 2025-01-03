import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/core/providers/Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FuelCare - Vehicle Manager',
  description: 'Comprehensive vehicle management application for tracking expenses, fuel costs, and maintenance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
