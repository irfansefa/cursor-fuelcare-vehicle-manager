'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from '@/components/ui/modal/modal';
import { Button } from '@/components/ui/button/button';

interface DeleteFuelLogDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export function DeleteFuelLogDialog({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteFuelLogDialogProps) {
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Delete Fuel Log</ModalTitle>
          <ModalDescription>
            Are you sure you want to delete this fuel log? This action cannot be undone.
          </ModalDescription>
        </ModalHeader>
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
} 