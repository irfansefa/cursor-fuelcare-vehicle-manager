'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowLeft } from "react-icons/fi"

import { Badge } from "@/components/ui/utils/badge"
import { Separator } from "@/components/ui/utils/separator"

export default function UtilsShowcase() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <Link href="/showcase" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Showcase
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Utility Components</h1>

      {/* Badge Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Badge</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Badge Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="error">Error</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Badge Sizes</h3>
            <div className="flex items-center gap-4">
              <Badge size="sm">Small</Badge>
              <Badge size="default">Default</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Separator Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Separator</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Horizontal Separators</h3>
            <div className="space-y-4">
              <Separator />
              <Separator variant="muted" />
              <Separator variant="primary" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Vertical Separators</h3>
            <div className="flex h-8 items-center space-x-4">
              <div>Item 1</div>
              <Separator orientation="vertical" />
              <div>Item 2</div>
              <Separator orientation="vertical" variant="primary" />
              <div>Item 3</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Separator Sizes</h3>
            <div className="space-y-4">
              <Separator size="sm" />
              <Separator size="default" />
              <Separator size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
        <pre className="text-sm">
          {`// Badge Example
<Badge variant="success" size="lg">
  Success
</Badge>

// Separator Example
<Separator orientation="horizontal" variant="primary" size="lg" />

// Vertical Separator Example
<div className="flex h-8 items-center space-x-4">
  <div>Item 1</div>
  <Separator orientation="vertical" />
  <div>Item 2</div>
</div>`}
        </pre>
      </div>
    </div>
  )
} 