'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  {
    items: [
      { title: 'Typography', href: '/showcase/typography' },
      { title: 'Colors', href: '/showcase/colors' },
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
    <div className="pt-14 md:pt-16">
      {/* Sidebar - Desktop only */}
      <aside className="hidden md:block fixed left-0 top-16 bottom-0 w-72 border-r bg-background overflow-y-auto">
        <nav className="p-6 space-y-6">
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
      </aside>

      {/* Main content */}
      <div className="w-full md:pl-72">
        <div className="container py-6">
          {children}
        </div>
      </div>
    </div>
  );
} 