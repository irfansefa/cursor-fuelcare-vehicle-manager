'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const items = [
  {
    title: 'Dashboard',
    href: '/',
  },
  {
    title: 'Vehicles',
    href: '/vehicles',
  },
  {
    title: 'Fuel Logs',
    href: '/fuel-logs',
  },
  {
    title: 'Expenses',
    href: '/expenses',
  },
  {
    title: 'Maintenance',
    href: '/maintenance',
  },
  {
    title: 'Showcase',
    href: '/showcase',
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">FuelCare</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname === item.href ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
} 