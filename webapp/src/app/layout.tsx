import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from "@/core/providers/Providers";
import { MainNav } from "@/components/navigation/main-nav";
import { UserNav } from "@/components/navigation/user-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Container } from "@/components/ui/layout/container";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@/components/ui/navigation/navbar";
import Link from 'next/link';

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
        <Providers>
          <div className="min-h-screen bg-background">
            <Navbar 
              variant="default" 
              size="sm"
              className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60"
              brand={
                <NavbarBrand>
                  <Link href="/" className="flex items-center space-x-2">
                    <span className="hidden font-bold sm:inline-block">FuelCare</span>
                  </Link>
                </NavbarBrand>
              }
            >
              <NavbarContent>
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                  <ModeToggle />
                  <UserNav />
                </div>
              </NavbarContent>
            </Navbar>

            {/* Main content */}
            <main>
              <Container className="py-6">
                {children}
              </Container>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
