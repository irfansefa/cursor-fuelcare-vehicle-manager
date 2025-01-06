'use client';

import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/form/label";
import { useMemo } from "react";

interface ChartDateRangeControlsProps {
  startDate: string;
  endDate: string;
  onRangeChange: (startDate: string, endDate: string) => void;
  minDate?: string;
  maxDate?: string;
}

type PresetRange = '1M' | '3M' | '6M' | '1Y' | 'ALL';

export function ChartDateRangeControls({
  startDate,
  endDate,
  onRangeChange,
  minDate,
  maxDate,
}: ChartDateRangeControlsProps) {
  const presets: { label: string; value: PresetRange }[] = [
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' },
    { label: '1Y', value: '1Y' },
    { label: 'All', value: 'ALL' },
  ];

  const handlePresetClick = (preset: PresetRange) => {
    const end = maxDate || new Date().toISOString().split('T')[0];
    let start = new Date(end);

    switch (preset) {
      case '1M':
        start.setMonth(start.getMonth() - 1);
        break;
      case '3M':
        start.setMonth(start.getMonth() - 3);
        break;
      case '6M':
        start.setMonth(start.getMonth() - 6);
        break;
      case '1Y':
        start.setFullYear(start.getFullYear() - 1);
        break;
      case 'ALL':
        start = new Date(minDate || '2000-01-01');
        break;
    }

    const startStr = start.toISOString().split('T')[0];
    onRangeChange(startStr, end);
  };

  const activePreset = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
    
    if (diffMonths <= 1) return '1M';
    if (diffMonths <= 3) return '3M';
    if (diffMonths <= 6) return '6M';
    if (diffMonths <= 12) return '1Y';
    return 'ALL';
  }, [startDate, endDate]);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 mb-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>From</Label>
          <Input
            type="date"
            value={startDate}
            min={minDate}
            max={endDate}
            onChange={(e) => onRangeChange(e.target.value, endDate)}
          />
        </div>
        <div className="space-y-2">
          <Label>To</Label>
          <Input
            type="date"
            value={endDate}
            min={startDate}
            max={maxDate}
            onChange={(e) => onRangeChange(startDate, e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2">
        {presets.map(({ label, value }) => (
          <Button
            key={value}
            variant={activePreset === value ? "default" : "outline"}
            size="sm"
            onClick={() => handlePresetClick(value)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
} 