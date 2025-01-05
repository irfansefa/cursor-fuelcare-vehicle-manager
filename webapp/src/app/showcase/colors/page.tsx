'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowLeft } from "react-icons/fi"

const colors = {
  primary: [
    { name: 'primary', class: 'bg-primary text-primary-foreground' },
    { name: 'primary-foreground', class: 'bg-primary-foreground text-primary' },
  ],
  secondary: [
    { name: 'secondary', class: 'bg-secondary text-secondary-foreground' },
    { name: 'secondary-foreground', class: 'bg-secondary-foreground text-secondary' },
  ],
  accent: [
    { name: 'accent', class: 'bg-accent text-accent-foreground' },
    { name: 'accent-foreground', class: 'bg-accent-foreground text-accent' },
  ],
  destructive: [
    { name: 'destructive', class: 'bg-destructive text-destructive-foreground' },
    { name: 'destructive-foreground', class: 'bg-destructive-foreground text-destructive' },
  ],
  muted: [
    { name: 'muted', class: 'bg-muted text-muted-foreground' },
    { name: 'muted-foreground', class: 'bg-muted-foreground text-muted' },
  ],
  card: [
    { name: 'card', class: 'bg-card text-card-foreground' },
    { name: 'card-foreground', class: 'bg-card-foreground text-card' },
  ],
  popover: [
    { name: 'popover', class: 'bg-popover text-popover-foreground' },
    { name: 'popover-foreground', class: 'bg-popover-foreground text-popover' },
  ],
  border: [
    { name: 'border', class: 'bg-border' },
  ],
  input: [
    { name: 'input', class: 'bg-input' },
  ],
  ring: [
    { name: 'ring', class: 'bg-ring' },
  ],
}

const semanticColors = {
  background: [
    { name: 'background', class: 'bg-background text-foreground' },
    { name: 'foreground', class: 'bg-foreground text-background' },
  ],
  success: [
    { name: 'success', class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' },
  ],
  warning: [
    { name: 'warning', class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' },
  ],
  error: [
    { name: 'error', class: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' },
  ],
  info: [
    { name: 'info', class: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' },
  ],
}

export default function ColorsShowcase() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <Link href="/showcase" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Showcase
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Colors</h1>

      {/* Theme Colors Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Theme Colors</h2>
        <div className="grid gap-8">
          {Object.entries(colors).map(([category, variants]) => (
            <div key={category}>
              <h3 className="text-lg font-medium mb-4 capitalize">{category}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {variants.map((color) => (
                  <div
                    key={color.name}
                    className={`p-4 rounded-lg ${color.class}`}
                  >
                    <div className="font-mono text-sm">{color.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Semantic Colors Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Semantic Colors</h2>
        <div className="grid gap-8">
          {Object.entries(semanticColors).map(([category, variants]) => (
            <div key={category}>
              <h3 className="text-lg font-medium mb-4 capitalize">{category}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {variants.map((color) => (
                  <div
                    key={color.name}
                    className={`p-4 rounded-lg ${color.class}`}
                  >
                    <div className="font-mono text-sm">{color.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Code Example */}
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
        <pre className="text-sm">
          {`// Using Theme Colors
<div className="bg-primary text-primary-foreground">
  Primary Color
</div>

<div className="bg-secondary text-secondary-foreground">
  Secondary Color
</div>

// Using Semantic Colors
<div className="bg-success text-success-foreground">
  Success Message
</div>

<div className="bg-error text-error-foreground">
  Error Message
</div>`}
        </pre>
      </div>
    </div>
  )
} 