'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button/button"
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react"

export default function ButtonsShowcase() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <Link href="/showcase" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Showcase
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Buttons</h1>
      
      {/* Default Variants */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium mb-2">Default Variants</h3>
          <Button>Default Button</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>

        {/* Sizes */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium mb-2">Sizes</h3>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>

        {/* States */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium mb-2">States</h3>
          <Button disabled>Disabled</Button>
          <Button className="cursor-wait">Loading</Button>
        </div>

        {/* With Icons */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium mb-2">With Icons</h3>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Code Example */}
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
        <pre className="text-sm">
          {`import { Button } from "@/components/ui/button/button"

// Basic usage
<Button>Default Button</Button>
<Button variant="destructive">Destructive</Button>

// With icons
<Button>
  <FiPlus className="mr-2 h-4 w-4" /> Add New
</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// States
<Button disabled>Disabled</Button>`}
        </pre>
      </div>
    </div>
  )
} 