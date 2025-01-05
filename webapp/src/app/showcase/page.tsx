'use client';

import React from 'react';
import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input/input"
import { FiPlus, FiTrash2, FiSave, FiSearch, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"

export default function ComponentShowcase() {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Component Showcase</h1>

      {/* Buttons Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        
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
              <FiPlus className="mr-2 h-4 w-4" /> Add New
            </Button>
            <Button variant="destructive">
              <FiTrash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
            <Button variant="outline">
              <FiSave className="mr-2 h-4 w-4" /> Save
            </Button>
            <Button size="icon">
              <FiPlus className="h-4 w-4" />
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
      </section>

      {/* Inputs Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
        
        {/* Basic Inputs */}
        <div className="flex flex-wrap gap-8 mb-8">
          <div className="flex flex-col gap-4 min-w-[280px]">
            <h3 className="text-lg font-medium mb-2">Basic Inputs</h3>
            <Input placeholder="Default input" />
            <Input type="email" placeholder="Email input" />
            <Input type="number" placeholder="Number input" />
            <Input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password input" 
              rightIcon={
                <button onClick={() => setShowPassword(!showPassword)} type="button">
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              }
            />
          </div>

          {/* Input Sizes */}
          <div className="flex flex-col gap-4 min-w-[280px]">
            <h3 className="text-lg font-medium mb-2">Sizes</h3>
            <Input size="sm" placeholder="Small input" />
            <Input size="default" placeholder="Default input" />
            <Input size="lg" placeholder="Large input" />
          </div>

          {/* States */}
          <div className="flex flex-col gap-4 min-w-[280px]">
            <h3 className="text-lg font-medium mb-2">States</h3>
            <Input disabled placeholder="Disabled input" />
            <Input readOnly value="Read-only input" />
            <Input error errorMessage="This field is required" placeholder="Error state" />
            <Input required placeholder="Required field" />
          </div>

          {/* With Icons */}
          <div className="flex flex-col gap-4 min-w-[280px]">
            <h3 className="text-lg font-medium mb-2">With Icons</h3>
            <Input
              placeholder="Search..."
              leftIcon={<FiSearch className="h-4 w-4" />}
            />
            <Input
              type="email"
              placeholder="Email address"
              leftIcon={<FiMail className="h-4 w-4" />}
            />
            <Input
              type="password"
              placeholder="Password"
              leftIcon={<FiLock className="h-4 w-4" />}
              rightIcon={<FiEye className="h-4 w-4" />}
            />
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
          <pre className="text-sm">
            {`import { Input } from "@/components/ui/input/input"

// Basic usage
<Input placeholder="Default input" />
<Input type="email" placeholder="Email input" />

// With icons
<Input
  placeholder="Search..."
  leftIcon={<FiSearch className="h-4 w-4" />}
/>

// Different sizes
<Input size="sm" placeholder="Small input" />
<Input size="lg" placeholder="Large input" />

// States
<Input disabled placeholder="Disabled input" />
<Input error errorMessage="This field is required" />

// With icons on both sides
<Input
  type="password"
  placeholder="Password"
  leftIcon={<FiLock className="h-4 w-4" />}
  rightIcon={<FiEye className="h-4 w-4" />}
/>`}
          </pre>
        </div>
      </section>
    </div>
  )
} 