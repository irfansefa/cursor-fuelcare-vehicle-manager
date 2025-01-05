'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  {
    items: [
      { title: 'Buttons', href: '/showcase/buttons' },
      { title: 'Inputs', href: '/showcase/inputs' },
      { title: 'Forms', href: '/showcase/forms' },
      { title: 'Data Display', href: '/showcase/data-display' },
      { title: 'Feedback', href: '/showcase/feedback' },
      { title: 'Navigation', href: '/showcase/navigation' },
      { title: 'Modals', href: '/showcase/modals' },
      { title: 'Layout', href: '/showcase/layout' },
      { title: 'Utils', href: '/showcase/utils' },
      { title: 'Charts', href: '/showcase/charts' },
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
      <div className="fixed left-0 top-0 z-40 flex h-screen w-72 flex-col border-r bg-background pt-6">
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-6 px-6">
            {navigation.map((group, idx) => (
              <div key={idx} className="space-y-1">
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
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-72 w-full">
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
} 