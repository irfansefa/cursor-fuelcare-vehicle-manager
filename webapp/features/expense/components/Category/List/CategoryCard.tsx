'use client';

import { Category } from '@/features/expense/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card/card';
import { Button } from '@/components/ui/button/button';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: () => void;
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-grow p-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={cn(
              "w-6 h-6 rounded-full",
              category.color
            )}
          />
          <h3 className="text-lg font-semibold">{category.name}</h3>
        </div>
        {category.description && (
          <p className="text-muted-foreground text-sm">{category.description}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-4 pt-0">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onEdit(category)}
        >
          <FiEdit2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onDelete}
        >
          <FiTrash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
} 