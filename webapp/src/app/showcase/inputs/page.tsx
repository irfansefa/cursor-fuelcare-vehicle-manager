'use client';

import React from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input/input"
import { Search, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { DateRangePicker, DateRange } from "@/components/ui/input/date-range-picker"
import { Label } from "@/components/ui/form/label"

export default function InputsShowcase() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [dateRange1, setDateRange1] = React.useState<DateRange>({})
  const [dateRange2, setDateRange2] = React.useState<DateRange>({
    from: '2024-01-01',
    to: '2024-01-31',
  })
  const [dateRange3, setDateRange3] = React.useState<DateRange>({})

  const handleDateRange1Change = (value: DateRange) => setDateRange1(value)
  const handleDateRange2Change = (value: DateRange) => setDateRange2(value)
  const handleDateRange3Change = (value: DateRange) => setDateRange3(value)

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <Link href="/showcase" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
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
                {showPassword ? <EyeOff /> : <Eye />}
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
            leftIcon={<Search className="h-4 w-4" />}
          />
          <Input
            type="email"
            placeholder="Email address"
            leftIcon={<Mail className="h-4 w-4" />}
          />
          <Input
            type="password"
            placeholder="Password"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={<Eye className="h-4 w-4" />}
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
  leftIcon={<Search className="h-4 w-4" />}
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
  leftIcon={<Lock className="h-4 w-4" />}
  rightIcon={<Eye className="h-4 w-4" />}
/>`}
        </pre>
      </div>

      {/* Date Range Picker */}
      <div className="flex flex-col gap-4 min-w-[280px] mt-8">
        <h3 className="text-lg font-medium mb-2">Date Range Picker</h3>
        <div className="space-y-4">
          <div>
            <Label>Default</Label>
            <DateRangePicker
              value={dateRange1}
              onChange={handleDateRange1Change}
            />
          </div>

          <div>
            <Label>With Initial Value</Label>
            <DateRangePicker
              value={dateRange2}
              onChange={handleDateRange2Change}
            />
          </div>

          <div>
            <Label>Disabled</Label>
            <DateRangePicker
              value={dateRange3}
              onChange={handleDateRange3Change}
              disabled
            />
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md mt-4">
          <pre className="text-sm">
            {`import { DateRangePicker, DateRange } from "@/components/ui/input/date-range-picker"

// Basic usage with state
const [dateRange, setDateRange] = useState<DateRange>({});
const handleDateRangeChange = (value: DateRange) => setDateRange(value);

<DateRangePicker
  value={dateRange}
  onChange={handleDateRangeChange}
/>

// With initial value
const [dateRange, setDateRange] = useState<DateRange>({
  from: '2024-01-01',
  to: '2024-01-31',
});

<DateRangePicker
  value={dateRange}
  onChange={handleDateRangeChange}
/>

// Disabled state
<DateRangePicker disabled />`}
          </pre>
        </div>
      </div>
    </div>
  )
} 