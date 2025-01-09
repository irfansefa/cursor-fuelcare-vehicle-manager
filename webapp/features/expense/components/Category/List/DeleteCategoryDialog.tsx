'use client';

import { useState } from 'react';
import { Category } from '@/features/expense/types';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/feedback/alert';
import { Button } from '@/components/ui/button/button';

interface DeleteCategoryDialogProps {
  category: Category | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  isDeleting: boolean;
}

export function DeleteCategoryDialog({
  category,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteCategoryDialogProps) {
  if (!category) return null;

  return (
    <Alert variant="error" onClose={onClose}>
      <AlertTitle>Delete Category</AlertTitle>
      <AlertDescription className="mt-2">
        Are you sure you want to delete the category "{category.name}"? This action cannot be undone.
      </AlertDescription>
      <div className="mt-4 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={onClose}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          disabled={isDeleting}
          onClick={async (e) => {
            e.preventDefault();
            await onConfirm(category.id);
          }}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </Alert>
  );
} 