'use client';

import React from 'react';
import Link from 'next/link';

export default function ComponentShowcase() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Component Showcase</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link 
          href="/showcase/colors" 
          className="block p-6 rounded-lg border hover:border-primary transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Colors</h2>
          <p className="text-muted-foreground">
            Color palette and theme color variables used throughout the application.
          </p>
        </Link>

        <Link 
          href="/showcase/typography" 
          className="block p-6 rounded-lg border hover:border-primary transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Typography</h2>
          <p className="text-muted-foreground">
            Text styles, fonts, headings, and typography components.
          </p>
        </Link>

        <Link 
          href="/showcase/buttons" 
          className="block p-6 rounded-lg border hover:border-primary transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Buttons</h2>
          <p className="text-muted-foreground">
            Button components with different variants, sizes, and states.
          </p>
        </Link>

        <Link 
          href="/showcase/inputs" 
          className="block p-6 rounded-lg border hover:border-primary transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Inputs</h2>
          <p className="text-muted-foreground">
            Input components with various types, states, and icon support.
          </p>
        </Link>

        <Link 
          href="/showcase/forms" 
          className="block p-6 rounded-lg border hover:border-primary transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Forms</h2>
          <p className="text-muted-foreground">
            Form components with validation, error handling, and various field types.
          </p>
        </Link>

        <Link 
          href="/showcase/data-display" 
          className="block p-6 rounded-lg border hover:border-primary transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Data Display</h2>
          <p className="text-muted-foreground">
            Components for displaying data including cards, tables, and statistics.
          </p>
        </Link>

        <Link 
          href="/showcase/charts" 
          className="block p-6 rounded-lg border hover:border-primary transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Charts</h2>
          <p className="text-muted-foreground">
            Data visualization components including pie, bar, and line charts.
          </p>
        </Link>

        <Link 
          href="/showcase/layout" 
          className="block p-6 rounded-lg border hover:border-primary transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Layout</h2>
          <p className="text-muted-foreground">
            Layout components including containers, grids, and stacks.
          </p>
        </Link>

        <Link 
          href="/showcase/navigation" 
          className="block p-6 rounded-lg border hover:border-primary transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Navigation</h2>
          <p className="text-muted-foreground">
            Navigation components including breadcrumbs and menus.
          </p>
        </Link>

        <Link 
          href="/showcase/modals" 
          className="block p-6 rounded-lg border hover:border-primary transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Modals</h2>
          <p className="text-muted-foreground">
            Modal dialogs and popup components.
          </p>
        </Link>

        <Link 
          href="/showcase/utils" 
          className="block p-6 rounded-lg border hover:border-primary transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Utilities</h2>
          <p className="text-muted-foreground">
            Utility components like separators and badges.
          </p>
        </Link>

        <Link 
          href="/showcase/feedback" 
          className="block p-6 rounded-lg border hover:border-primary transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Feedback</h2>
          <p className="text-muted-foreground">
            Components for user feedback including alerts, toasts, progress, and loading states.
          </p>
        </Link>
      </div>
    </div>
  )
} 