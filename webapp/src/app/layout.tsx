import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from "@/core/providers/Providers";
import { MainNav } from "@/components/navigation/main-nav";
import { UserNav } from "@/components/navigation/user-nav";
import { ModeToggle } from "@/components/mode-toggle";

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
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <Providers>
          <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center">
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                  <ModeToggle />
                  <UserNav />
                </div>
              </div>
            </header>

            {/* Main content */}
            <main className="container py-6">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
