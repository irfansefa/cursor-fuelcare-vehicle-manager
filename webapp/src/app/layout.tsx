import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { MainNavbar } from '@/components/ui/navigation/navbar-main';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FuelCare',
  description: 'Track your vehicle expenses and fuel consumption',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className)} cz-shortcut-listen="true">
        <Providers>
          <MainNavbar />
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
