'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  {
    title: 'Components',
    items: [
      { title: 'Buttons', href: '#buttons' },
      { title: 'Inputs', href: '#inputs' },
      { title: 'Forms', href: '#forms' },
      { title: 'Cards', href: '#cards' },
      { title: 'Navigation', href: '#navigation' },
      { title: 'Feedback', href: '#feedback' },
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
      {/* Sidebar */}
      <div className="fixed inset-y-0 z-50 flex w-72 flex-col border-r">
        {/* Sidebar header */}
        <div className="border-b px-6 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">FuelCare</span>
          </Link>
        </div>
        {/* Sidebar content */}
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-6 px-6">
            {navigation.map((group) => (
              <div key={group.title}>
                <h3 className="mb-2 text-sm font-semibold tracking-tight text-muted-foreground">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <a
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
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-72">
        <main>{children}</main>
      </div>
    </div>
  );
} 