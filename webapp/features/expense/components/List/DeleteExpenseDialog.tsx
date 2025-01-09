'use client';

import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/modal/modal';
import { Button } from '@/components/ui/button/button';
import { Alert, AlertDescription } from '@/components/ui/feedback/alert';
import { AlertTriangle } from 'lucide-react';
import { ExpenseWithDetails } from '../../types';

interface DeleteExpenseDialogProps {
  expense: ExpenseWithDetails | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  isDeleting?: boolean;
}

export function DeleteExpenseDialog({
  expense,
  onClose,
  onConfirm,
  isDeleting = false,
}: DeleteExpenseDialogProps) {
  const handleConfirm = async () => {
    if (!expense) return;
    await onConfirm(expense.id);
  };

  return (
    <Modal open={!!expense} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Delete Expense</ModalTitle>
        </ModalHeader>
        <div className="space-y-4">
          <Alert variant="error">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This action cannot be undone. This will permanently delete the expense
              {expense && (
                <span className="font-medium">
                  {" "}for {expense.category.name} ({expense.date})
                </span>
              )}
              .
            </AlertDescription>
          </Alert>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
} 