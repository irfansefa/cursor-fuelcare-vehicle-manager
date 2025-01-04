'use client';

import React from 'react';

const ShowcasePage = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="border-b pb-5">
          <h1 className="text-3xl font-bold tracking-tight">Component Showcase</h1>
          <p className="mt-2 text-muted-foreground">
            A collection of all components with their variants and states.
          </p>
        </div>

        {/* Buttons Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Buttons</h2>
              <p className="text-sm text-muted-foreground">
                Button components with different variants and states.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {/* Button variants will go here */}
          </div>
        </section>

        {/* Inputs Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Inputs</h2>
              <p className="text-sm text-muted-foreground">
                Input components with different states and variations.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {/* Input variants will go here */}
          </div>
        </section>

        {/* Forms Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Forms</h2>
              <p className="text-sm text-muted-foreground">
                Form components and layouts.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {/* Form examples will go here */}
          </div>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Cards</h2>
              <p className="text-sm text-muted-foreground">
                Card components with different layouts and content.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Card examples will go here */}
          </div>
        </section>

        {/* Navigation Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Navigation</h2>
              <p className="text-sm text-muted-foreground">
                Navigation components and patterns.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {/* Navigation examples will go here */}
          </div>
        </section>

        {/* Feedback Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Feedback</h2>
              <p className="text-sm text-muted-foreground">
                Feedback and notification components.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {/* Feedback components will go here */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShowcasePage; 