'use client';

import { Category } from '@/features/expense/types';
import { Button } from '@/components/ui/button/button';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/modal/modal';

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
  return (
    <Modal open={!!category} onOpenChange={() => onClose()}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Delete Category</ModalTitle>
        </ModalHeader>
        <div className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            Are you sure you want to delete the category "{category?.name}"? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
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
                if (category) {
                  await onConfirm(category.id);
                }
              }}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
} 