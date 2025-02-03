'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from "lucide-react";
import { typographyVariants, typographyScale, cn } from "@/components/ui/utils";

// Actual values from Tailwind config
const typographyValues = {
  // Mobile optimized - smaller sizes for limited screen space
  'xs-mobile': { fontSize: '0.875rem', lineHeight: '1.25rem' },   // 14px/20px
  'sm-mobile': { fontSize: '0.9375rem', lineHeight: '1.375rem' }, // 15px/22px
  'base-mobile': { fontSize: '1rem', lineHeight: '1.5rem' },      // 16px/24px
  'lg-mobile': { fontSize: '1.0625rem', lineHeight: '1.625rem' }, // 17px/26px
  'xl-mobile': { fontSize: '1.125rem', lineHeight: '1.75rem' },   // 18px/28px
  // Desktop optimized - larger sizes for better readability
  'xs': { fontSize: '0.875rem', lineHeight: '1.25rem' },      // 14px/20px
  'sm': { fontSize: '1rem', lineHeight: '1.5rem' },           // 16px/24px
  'base': { fontSize: '1.125rem', lineHeight: '1.75rem' },    // 18px/28px
  'lg': { fontSize: '1.25rem', lineHeight: '1.875rem' },      // 20px/30px
  'xl': { fontSize: '1.5rem', lineHeight: '2rem' },           // 24px/32px
} as const;

export default function TypographyShowcase() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <Link href="/showcase" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Showcase
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Typography System</h1>

      {/* Mobile Optimization Info */}
      <section className="mb-12 p-4 border rounded-lg bg-muted/10">
        <h2 className="text-xl font-semibold mb-4">Typography Size System</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Mobile Typography</h3>
            <p className="text-sm text-muted-foreground">Mobile sizes are optimized for smaller screens and closer viewing distances. Starting at 14px for the smallest text, sizes increase gradually to maintain hierarchy while preserving space.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Desktop Typography</h3>
            <p className="text-sm text-muted-foreground">Desktop sizes are larger to account for viewing distance and available screen space. Base size starts at 18px for optimal readability, with proportional scaling for hierarchy.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Size Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm font-medium mb-1">Mobile Sizes:</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  <li>xs: 14px/20px (minimum readable size)</li>
                  <li>sm: 15px/22px</li>
                  <li>base: 16px/24px</li>
                  <li>lg: 17px/26px</li>
                  <li>xl: 18px/28px</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Desktop Sizes:</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  <li>xs: 14px/20px</li>
                  <li>sm: 16px/24px</li>
                  <li>base: 18px/28px</li>
                  <li>lg: 20px/30px</li>
                  <li>xl: 24px/32px</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Design Rationale</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Mobile: Smaller sizes due to closer viewing distance and limited space</li>
              <li>Desktop: Larger sizes for comfortable reading at arm's length</li>
              <li>Minimum 14px size ensures readability across all devices</li>
              <li>Proportional line heights for optimal reading experience</li>
              <li>Gradual size increments maintain clear hierarchy</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="space-y-12">
        {/* Typography Values */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Typography Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mobile Values */}
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/10">
                <h3 className="font-semibold mb-4">Mobile Typography Values</h3>
                {Object.entries(typographyValues)
                  .filter(([key]) => key.includes('mobile'))
                  .map(([key, value]) => (
                    <div key={key} className="p-2 border rounded mb-2">
                      <p className="font-medium text-sm mb-1">{key}</p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>Font Size: {value.fontSize} ({parseInt(value.fontSize) * 16}px)</p>
                        <p>Line Height: {value.lineHeight} ({parseInt(value.lineHeight) * 16}px)</p>
                        <p>Class: text-{key}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Desktop Values */}
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/10">
                <h3 className="font-semibold mb-4">Desktop Typography Values</h3>
                {Object.entries(typographyValues)
                  .filter(([key]) => !key.includes('mobile'))
                  .map(([key, value]) => (
                    <div key={key} className="p-2 border rounded mb-2">
                      <p className="font-medium text-sm mb-1">{key}</p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>Font Size: {value.fontSize} ({parseInt(value.fontSize) * 16}px)</p>
                        <p>Line Height: {value.lineHeight} ({parseInt(value.lineHeight) * 16}px)</p>
                        <p>Class: text-{key}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Typography */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Responsive Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mobile Column */}
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/10">
                <h3 className="font-semibold mb-4">Mobile Typography</h3>
                {Object.entries(typographyScale).map(([size, { mobile }]) => (
                  <div key={size} className="p-2 border rounded">
                    <p className={cn("mb-1", mobile)}>
                      The quick brown fox jumps over the lazy dog
                    </p>
                    <code className="text-xs text-muted-foreground">
                      Size: {size}, Class: {mobile}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Column */}
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/10">
                <h3 className="font-semibold mb-4">Desktop Typography</h3>
                {Object.entries(typographyScale).map(([size, { desktop }]) => (
                  <div key={size} className="p-2 border rounded">
                    <p className={cn("mb-1", desktop)}>
                      The quick brown fox jumps over the lazy dog
                    </p>
                    <code className="text-xs text-muted-foreground">
                      Size: {size}, Class: {desktop}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Component Typography */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Component Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mobile Variants */}
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/10">
                <h3 className="font-semibold mb-4">Mobile Components</h3>
                {Object.entries(typographyVariants).map(([variant, { mobile }]) => (
                  <div key={variant} className="p-2 border rounded">
                    <p className={cn("mb-1", mobile)}>
                      {variant.toUpperCase()}: The quick brown fox
                    </p>
                    <code className="text-xs text-muted-foreground">
                      Variant: {variant}, Class: {mobile}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Variants */}
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/10">
                <h3 className="font-semibold mb-4">Desktop Components</h3>
                {Object.entries(typographyVariants).map(([variant, { desktop }]) => (
                  <div key={variant} className="p-2 border rounded">
                    <p className={cn("mb-1", desktop)}>
                      {variant.toUpperCase()}: The quick brown fox
                    </p>
                    <code className="text-xs text-muted-foreground">
                      Variant: {variant}, Class: {desktop}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Responsive Text Example</h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted/10 rounded">
                  <p className={cn(
                    typographyVariants.h1.mobile,
                    "md:hidden"
                  )}>Mobile Heading</p>
                  <p className={cn(
                    typographyVariants.h1.desktop,
                    "hidden md:block"
                  )}>Desktop Heading</p>
                  <code className="text-xs text-muted-foreground block mt-2">
                    Uses mobile variant below md breakpoint, desktop variant above
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 