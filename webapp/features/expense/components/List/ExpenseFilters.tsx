'use client';

import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/form/label";
import { Button } from "@/components/ui/button/button";
import { FiX } from "react-icons/fi";
import { CategorySelect } from "@/features/expense/components/ExpenseLog/CategorySelect";

export interface ExpenseFilters {
  dateFrom?: string;
  dateTo?: string;
  categoryId?: string;
  vendor?: string;
}

interface ExpenseFiltersProps {
  filters: ExpenseFilters;
  onFiltersChange: (filters: ExpenseFilters) => void;
}

export function ExpenseFilters({ filters, onFiltersChange }: ExpenseFiltersProps) {
  const handleReset = () => {
    onFiltersChange({});
  };

  const handleCategoryChange = (value: string) => {
    onFiltersChange({
      ...filters,
      categoryId: value === 'all' ? undefined : value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>From Date</Label>
          <Input
            type="date"
            value={filters.dateFrom || ''}
            onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>To Date</Label>
          <Input
            type="date"
            value={filters.dateTo || ''}
            onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <CategorySelect
            value={filters.categoryId || ''}
            onChange={handleCategoryChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Vendor</Label>
          <Input
            type="text"
            placeholder="Search vendor..."
            value={filters.vendor || ''}
            onChange={(e) => onFiltersChange({ ...filters, vendor: e.target.value })}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={!Object.values(filters).some(Boolean)}
        >
          <FiX className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
} 