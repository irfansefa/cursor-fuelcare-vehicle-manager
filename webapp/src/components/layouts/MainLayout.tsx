'use client';

import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold">FuelCare</span>
          </div>
          <nav className="flex items-center space-x-4">
            {/* Add navigation items here */}
          </nav>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 border-r bg-white lg:block">
          <div className="flex h-full flex-col">
            <nav className="flex-1 space-y-1 p-4">
              {/* Add sidebar navigation items here */}
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
} 