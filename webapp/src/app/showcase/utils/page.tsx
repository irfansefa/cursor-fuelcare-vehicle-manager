'use client';

import React from 'react';
import { Badge } from "@/components/ui/utils/badge";

export default function UtilsShowcase() {
  return (
    <div className="container mx-auto p-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-4">Utility Components</h1>
        <p className="text-muted-foreground">
          A collection of utility components used throughout the application.
        </p>
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Badge</h2>
          <p className="text-muted-foreground mb-6">
            Badges are used to highlight status, labels, or counts. They can be used
            to add metadata to other UI elements.
          </p>
        </div>

        <div className="grid gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Badge>Default</Badge>
                <span className="text-sm text-muted-foreground">Default</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Secondary</Badge>
                <span className="text-sm text-muted-foreground">Secondary</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive">Destructive</Badge>
                <span className="text-sm text-muted-foreground">Destructive</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Outline</Badge>
                <span className="text-sm text-muted-foreground">Outline</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success">Success</Badge>
                <span className="text-sm text-muted-foreground">Success</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="warning">Warning</Badge>
                <span className="text-sm text-muted-foreground">Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="info">Info</Badge>
                <span className="text-sm text-muted-foreground">Info</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="error">Error</Badge>
                <span className="text-sm text-muted-foreground">Error</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge size="sm">Small</Badge>
                <span className="text-sm text-muted-foreground">Small</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge size="default">Default</Badge>
                <span className="text-sm text-muted-foreground">Default</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge size="lg">Large</Badge>
                <span className="text-sm text-muted-foreground">Large</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Usage</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              {`import { Badge } from "@/components/ui/utils/badge"

// Default badge
<Badge>Default</Badge>

// Badge with variant
<Badge variant="success">Success</Badge>

// Badge with size
<Badge size="lg">Large</Badge>

// Badge with variant and size
<Badge variant="info" size="sm">Small Info</Badge>`}
            </pre>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Examples</h3>
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">Active</Badge>
                <span className="text-sm text-muted-foreground">Status indicator</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="info" size="default">v1.0.0</Badge>
                <span className="text-sm text-muted-foreground">Version tag</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="warning" size="lg">New Feature</Badge>
                <span className="text-sm text-muted-foreground">Feature label</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 