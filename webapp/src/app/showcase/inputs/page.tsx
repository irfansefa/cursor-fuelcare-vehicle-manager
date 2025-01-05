'use client';

import React from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input/input"
import { FiSearch, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi"

export default function InputsShowcase() {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <Link href="/showcase" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Showcase
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Inputs</h1>
      
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
    </div>
  )
} 