'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowLeft } from "react-icons/fi"

import { Container } from "@/components/ui/layout/container"
import { Grid } from "@/components/ui/layout/grid"
import { Stack } from "@/components/ui/layout/stack"

export default function LayoutShowcase() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <Link href="/showcase" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Showcase
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Layout Components</h1>

      {/* Container Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Container</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Container Sizes</h3>
            <Container size="sm" className="bg-muted p-4">
              Small Container
            </Container>
            <Container size="md" className="bg-muted p-4">
              Medium Container
            </Container>
            <Container size="lg" className="bg-muted p-4">
              Large Container
            </Container>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Container Padding</h3>
            <Container padding="none" className="bg-muted">
              No Padding
            </Container>
            <Container padding="sm" className="bg-muted">
              Small Padding
            </Container>
            <Container padding="lg" className="bg-muted">
              Large Padding
            </Container>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Grid</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Grid Columns</h3>
            <Grid cols={2} className="mb-4">
              <div className="bg-muted p-4">Column 1</div>
              <div className="bg-muted p-4">Column 2</div>
            </Grid>
            <Grid cols={3} className="mb-4">
              <div className="bg-muted p-4">Column 1</div>
              <div className="bg-muted p-4">Column 2</div>
              <div className="bg-muted p-4">Column 3</div>
            </Grid>
            <Grid cols={4}>
              <div className="bg-muted p-4">Column 1</div>
              <div className="bg-muted p-4">Column 2</div>
              <div className="bg-muted p-4">Column 3</div>
              <div className="bg-muted p-4">Column 4</div>
            </Grid>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Grid Gaps</h3>
            <Grid cols={3} gap="sm" className="mb-4">
              <div className="bg-muted p-4">Small Gap</div>
              <div className="bg-muted p-4">Small Gap</div>
              <div className="bg-muted p-4">Small Gap</div>
            </Grid>
            <Grid cols={3} gap="lg">
              <div className="bg-muted p-4">Large Gap</div>
              <div className="bg-muted p-4">Large Gap</div>
              <div className="bg-muted p-4">Large Gap</div>
            </Grid>
          </div>
        </div>
      </section>

      {/* Stack Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Stack</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Stack Spacing</h3>
            <Stack spacing="sm" className="bg-muted p-4">
              <div className="bg-background p-4">Item 1</div>
              <div className="bg-background p-4">Item 2</div>
              <div className="bg-background p-4">Item 3</div>
            </Stack>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Stack with Dividers</h3>
            <Stack spacing="md" className="bg-muted p-4">
              <div className="bg-background p-4">Item 1</div>
              <div className="bg-background p-4">Item 2</div>
              <div className="bg-background p-4">Item 3</div>
            </Stack>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
        <pre className="text-sm">
          {`// Container Example
<Container size="md" padding="lg">
  Content with medium width and large padding
</Container>

// Grid Example
<Grid cols={3} gap="md">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</Grid>

// Stack Example
<Stack spacing="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>`}
        </pre>
      </div>
    </div>
  )
} 