'use client';

import { useState } from 'react';
import { FuelType } from '@/features/fuel/types';
import { FuelTypeCard } from './FuelTypeCard';
import { Grid } from '@/components/ui/layout/grid';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/form/select';
import { FiGrid, FiList } from 'react-icons/fi';

interface FuelTypeListProps {
  fuelTypes: FuelType[];
  onEdit: (fuelType: FuelType) => void;
  onDelete: (fuelType: FuelType) => void;
}

type ViewMode = 'grid' | 'list';

export function FuelTypeList({ fuelTypes, onEdit, onDelete }: FuelTypeListProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredFuelTypes = fuelTypes.filter((fuelType) => {
    const matchesSearch = fuelType.name.toLowerCase().includes(search.toLowerCase()) ||
      fuelType.description?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || fuelType.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center justify-between">
        <div className="flex-1 w-full sm:max-w-md">
          <Input
            type="search"
            placeholder="Search fuel types..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-1 border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <FiGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <FiList className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {filteredFuelTypes.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No fuel types found
        </div>
      ) : (
        <Grid
          cols={viewMode === 'grid' ? 3 : 1}
          gap="md"
          className="min-h-[200px]"
        >
          {filteredFuelTypes.map((fuelType) => (
            <FuelTypeCard
              key={fuelType.id}
              fuelType={fuelType}
              onEdit={onEdit}
              onDelete={() => onDelete(fuelType)}
            />
          ))}
        </Grid>
      )}
    </div>
  );
} 