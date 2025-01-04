'use client';

import React from 'react';
import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/inputs/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/cards/Card';
import { Navigation } from '@/components/navigation/Navigation';
import { Form } from '@/components/forms/Form';
import { Toast, ToastTitle, ToastDescription } from '@/components/feedback/Toast';
import { MainLayout } from '@/components/layouts/MainLayout';

const ShowcasePage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Component Showcase</h1>
      
      {/* Buttons Section */}
      <section className="mb-12" id="buttons">
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Button>Default Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
          </div>
          <div className="flex gap-4">
            <Button size="sm">Small Button</Button>
            <Button size="default">Default Size</Button>
            <Button size="lg">Large Button</Button>
            <Button size="icon">🔍</Button>
          </div>
        </div>
      </section>

      {/* Inputs Section */}
      <section className="mb-12" id="inputs">
        <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
        <div className="space-y-4 max-w-sm">
          <Input placeholder="Default input" />
          <Input variant="error" error="This field is required" placeholder="Error input" />
          <Input inputSize="sm" placeholder="Small input" />
          <Input inputSize="lg" placeholder="Large input" />
        </div>
      </section>

      {/* Forms Section */}
      <section className="mb-12" id="forms">
        <h2 className="text-2xl font-semibold mb-4">Forms</h2>
        <div className="space-y-4 max-w-sm">
          <Form onSubmit={() => {}}>
            <div className="space-y-4">
              <Input placeholder="Username" />
              <Input type="password" placeholder="Password" />
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </div>
      </section>

      {/* Cards Section */}
      <section className="mb-12" id="cards">
        <h2 className="text-2xl font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>This is a default card example</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content goes here</p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
          
          <Card variant="destructive">
            <CardHeader>
              <CardTitle>Destructive Card</CardTitle>
              <CardDescription>This is a destructive card example</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content goes here</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary">Cancel</Button>
            </CardFooter>
          </Card>

          <Card variant="ghost">
            <CardHeader>
              <CardTitle>Ghost Card</CardTitle>
              <CardDescription>This is a ghost card example</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content goes here</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost">Action</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="mb-12" id="navigation">
        <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
        <div className="space-y-4">
          <Navigation>
            <div className="flex items-center gap-4">
              <span className="font-bold">Logo</span>
              <Button variant="ghost">Home</Button>
              <Button variant="ghost">About</Button>
              <Button variant="ghost">Contact</Button>
            </div>
            <Button>Login</Button>
          </Navigation>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="mb-12" id="feedback">
        <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
        <div className="space-y-4">
          <Toast>
            <ToastTitle>Default Toast</ToastTitle>
            <ToastDescription>This is a default toast message.</ToastDescription>
          </Toast>
          
          <Toast variant="destructive">
            <ToastTitle>Error Toast</ToastTitle>
            <ToastDescription>This is an error toast message.</ToastDescription>
          </Toast>

          <Toast variant="success">
            <ToastTitle>Success Toast</ToastTitle>
            <ToastDescription>This is a success toast message.</ToastDescription>
          </Toast>
        </div>
      </section>
    </div>
  );
};

export default ShowcasePage; 