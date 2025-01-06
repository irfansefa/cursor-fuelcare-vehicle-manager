'use client';

import { Input } from "@/components/ui/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/form/select";
import { Label } from "@/components/ui/form/label";
import { Button } from "@/components/ui/button/button";
import { FiSearch, FiX } from "react-icons/fi";

export interface FuelLogFilters {
  dateFrom?: string;
  dateTo?: string;
  fuelType?: string;
  location?: string;
}

interface FuelLogFiltersProps {
  filters: FuelLogFilters;
  onFiltersChange: (filters: FuelLogFilters) => void;
}

export function FuelLogFilters({ filters, onFiltersChange }: FuelLogFiltersProps) {
  const handleReset = () => {
    onFiltersChange({});
  };

  const handleFuelTypeChange = (value: string) => {
    onFiltersChange({
      ...filters,
      fuelType: value === 'all' ? undefined : value,
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
          <Label>Fuel Type</Label>
          <Select
            value={filters.fuelType || 'all'}
            onValueChange={handleFuelTypeChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="All fuel types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All fuel types</SelectItem>
              <SelectItem value="regular">Regular</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            type="text"
            placeholder="Search location..."
            value={filters.location || ''}
            onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
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