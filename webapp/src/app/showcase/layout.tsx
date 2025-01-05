'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  {
    title: 'Components',
    items: [
      { title: 'Buttons', href: '/showcase/buttons' },
      { title: 'Inputs', href: '/showcase/inputs' },
      { title: 'Forms', href: '/showcase/forms' },
      // Commented out unimplemented components
      // { title: 'Cards', href: '/showcase/cards' },
      // { title: 'Navigation', href: '/showcase/navigation' },
      // { title: 'Feedback', href: '/showcase/feedback' },
    ],
  },
];

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b bg-background">
        <div className="px-6 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">FuelCare</span>
          </Link>
        </div>
      </header>

      {/* Sidebar */}
      <div className="fixed left-0 top-[57px] z-40 flex h-[calc(100vh-57px)] w-72 flex-col border-r bg-background">
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-6 px-6">
            <div>
              <h2 className="mb-4 text-lg font-semibold">Component Showcase</h2>
            </div>
            {navigation.map((group) => (
              <div key={group.title}>
                <h3 className="mb-2 text-sm font-semibold tracking-tight text-muted-foreground">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground',
                        pathname === item.href
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground'
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-72 pt-[57px] w-full">
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
} 