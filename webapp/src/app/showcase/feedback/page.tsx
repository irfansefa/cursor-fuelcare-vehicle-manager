'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertCircle, CheckCircle, Info } from "lucide-react";

import { Button } from "@/components/ui/button/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/feedback/alert"
import { Progress } from "@/components/ui/feedback/progress"
import { Spinner } from "@/components/ui/feedback/spinner"
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/feedback/toast"

// Separate client component for toast demo
function ToastDemo() {
  const [showToast, setShowToast] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => setShowToast(true)}>Show Toast</Button>
      </div>

      <ToastProvider>
        {/* Interactive Toast */}
        {showToast && (
          <Toast variant="default">
            <div className="grid gap-1">
              <ToastTitle>Toast Notification</ToastTitle>
              <ToastDescription>
                This is a toast notification message.
              </ToastDescription>
            </div>
            <ToastClose onClick={() => setShowToast(false)} />
          </Toast>
        )}

        {/* Example Toasts */}
        <Toast variant="info">
          <div className="grid gap-1">
            <ToastTitle>Info Toast</ToastTitle>
            <ToastDescription>
              Information message with action.
            </ToastDescription>
          </div>
          <ToastAction altText="Try again">Try again</ToastAction>
        </Toast>

        <Toast variant="success">
          <div className="grid gap-1">
            <ToastTitle>Success Toast</ToastTitle>
            <ToastDescription>
              Operation completed successfully.
            </ToastDescription>
          </div>
        </Toast>

        <Toast variant="warning">
          <div className="grid gap-1">
            <ToastTitle>Warning Toast</ToastTitle>
            <ToastDescription>
              Please review your input.
            </ToastDescription>
          </div>
        </Toast>

        <Toast variant="error">
          <div className="grid gap-1">
            <ToastTitle>Error Toast</ToastTitle>
            <ToastDescription>
              Something went wrong.
            </ToastDescription>
          </div>
          <ToastAction altText="Try again">Try again</ToastAction>
        </Toast>

        <ToastViewport />
      </ToastProvider>
    </div>
  );
}

export default function FeedbackShowcase() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <Link href="/showcase" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Showcase
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Feedback Components</h1>

      {/* Updated Alerts Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Alerts</h2>
        
        {/* Alert Variants */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Alert Variants</h3>
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Default Alert</AlertTitle>
                <AlertDescription>
                  This is a default alert — check it out!
                </AlertDescription>
              </Alert>

              <Alert variant="info">
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  Your trial period will end in 7 days.
                </AlertDescription>
              </Alert>

              <Alert variant="success">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your changes have been saved successfully.
                </AlertDescription>
              </Alert>

              <Alert variant="warning">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Your subscription is about to expire.
                </AlertDescription>
              </Alert>

              <Alert variant="error">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  There was an error processing your request.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          {/* Alert with Close Button */}
          <div>
            <h3 className="text-lg font-medium mb-2">Dismissible Alert</h3>
            <Alert variant="error" onClose={() => console.log('close')}>
              <AlertTitle>Dismissible Alert</AlertTitle>
              <AlertDescription>
                This alert can be dismissed using the close button. The close button is optimized for touch on mobile devices.
              </AlertDescription>
            </Alert>
          </div>

          {/* Alert without Title */}
          <div>
            <h3 className="text-lg font-medium mb-2">Alert without Title</h3>
            <Alert variant="info">
              <AlertDescription>
                A simple alert message without a title.
              </AlertDescription>
            </Alert>
          </div>

          {/* Alert with Custom Content */}
          <div>
            <h3 className="text-lg font-medium mb-2">Alert with Custom Content</h3>
            <Alert variant="warning">
              <AlertTitle>Storage Space</AlertTitle>
              <AlertDescription>
                <div className="mt-2 space-y-2">
                  <p>Your storage is almost full (90% used).</p>
                  <div className="h-2 w-full bg-yellow-100 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 w-[90%]" />
                  </div>
                  <p className="text-sm">Consider upgrading your plan.</p>
                </div>
              </AlertDescription>
            </Alert>
          </div>

          {/* Mobile Optimization Notes */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
            <h3 className="text-lg font-medium mb-2 text-blue-800 dark:text-blue-200">Mobile Optimizations</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <li>Increased touch targets (min-height: 52px on mobile)</li>
              <li>Larger close button (32x32px on mobile)</li>
              <li>Optimized typography for mobile screens</li>
              <li>Adjusted padding and spacing for touch</li>
              <li>Larger icons on mobile devices</li>
              <li>Touch feedback on interactive elements</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Progress</h2>
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Default Progress</h3>
            <Progress value={60} className="w-[60%]" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Progress Variants</h3>
            <div className="space-y-4">
              <Progress value={100} variant="success" />
              <Progress value={75} variant="warning" />
              <Progress value={25} variant="error" />
            </div>
          </div>
        </div>
      </section>

      {/* Spinner Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Spinners</h2>
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Sizes</h3>
            <div className="flex items-center gap-4">
              <Spinner size="sm" />
              <Spinner size="default" />
              <Spinner size="lg" />
              <Spinner size="xl" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Variants</h3>
            <div className="flex items-center gap-4">
              <Spinner variant="default" />
              <Spinner variant="success" />
              <Spinner variant="warning" />
              <Spinner variant="error" />
            </div>
          </div>
        </div>
      </section>

      {/* Toast Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Toast</h2>
        <ToastDemo />
      </section>

      {/* Code Example */}
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
        <pre className="text-sm">
          {`// Alert Example
<Alert variant="success">
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>
    Your changes have been saved.
  </AlertDescription>
</Alert>

// Progress Example
<Progress value={60} variant="success" />

// Spinner Example
<Spinner size="lg" variant="success" />

// Toast Example
<Toast variant="success">
  <ToastTitle>Success</ToastTitle>
  <ToastDescription>
    Operation completed successfully.
  </ToastDescription>
  <ToastAction>Undo</ToastAction>
</Toast>`}
        </pre>
      </div>
    </div>
  )
} 