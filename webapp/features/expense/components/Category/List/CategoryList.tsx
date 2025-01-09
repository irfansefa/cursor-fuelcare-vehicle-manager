'use client';

import { useState } from 'react';
import { Category } from '@/features/expense/types';
import { CategoryCard } from './CategoryCard';
import { Grid } from '@/components/ui/layout/grid';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/form/select';
import { FiGrid, FiList } from 'react-icons/fi';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

type ViewMode = 'grid' | 'list';

export function CategoryList({ categories, onEdit, onDelete }: CategoryListProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<keyof Category>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredCategories = categories
    .filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      const order = sortOrder === 'asc' ? 1 : -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * order;
      }
      return 0;
    });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 gap-4">
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
          <Select
            value={`${sortBy}-${sortOrder}`}
            onValueChange={(value) => {
              const [field, order] = value.split('-') as [keyof Category, 'asc' | 'desc'];
              setSortBy(field);
              setSortOrder(order);
            }}
          >
            <SelectTrigger className="max-w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="created_at-desc">Newest First</SelectItem>
              <SelectItem value="created_at-asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <FiGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <FiList className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No categories found
        </div>
      ) : (
        <Grid
          cols={viewMode === 'grid' ? 3 : 1}
          gap="md"
          className="min-h-[200px]"
        >
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={onEdit}
              onDelete={() => onDelete(category)}
            />
          ))}
        </Grid>
      )}
    </div>
  );
} 