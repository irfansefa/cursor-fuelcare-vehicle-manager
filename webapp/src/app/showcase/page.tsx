'use client';

import React from 'react';
import Link from 'next/link';

export default function ComponentShowcase() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Component Showcase</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Only showing implemented components */}
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
      </div>
    </div>
  )
} 