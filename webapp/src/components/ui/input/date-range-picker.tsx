'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input/input';

export interface DateRange {
  from?: string;
  to?: string;
}

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (value: DateRange) => void;
  disabled?: boolean;
  className?: string;
}

export const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  ({ className, value, onChange, disabled, ...props }, ref) => {
    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFrom = e.target.value;
      if (onChange) {
        // If 'to' exists and is less than new 'from', clear 'to'
        if (value?.to && value.to < newFrom) {
          onChange({ from: newFrom, to: undefined });
        } else {
          onChange({ ...value, from: newFrom });
        }
      }
    };

    const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTo = e.target.value;
      if (onChange) {
        // Only allow 'to' if 'from' exists and is less than or equal to 'to'
        if (value?.from && value.from <= newTo) {
          onChange({ ...value, to: newTo });
        }
      }
    };

    return (
      <div ref={ref} className={cn('flex items-center gap-2', className)} {...props}>
        <Input
          type="date"
          value={value?.from || ''}
          onChange={handleFromChange}
          disabled={disabled}
          className="w-[160px]"
          max={value?.to}
        />
        <span className="text-muted-foreground">to</span>
        <Input
          type="date"
          value={value?.to || ''}
          onChange={handleToChange}
          disabled={disabled || !value?.from}
          className="w-[160px]"
          min={value?.from}
        />
      </div>
    );
  }
);

DateRangePicker.displayName = 'DateRangePicker'; 