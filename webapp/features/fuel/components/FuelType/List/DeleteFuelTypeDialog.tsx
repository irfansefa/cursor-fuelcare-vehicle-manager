'use client';

import { FuelType } from '@/features/fuel/types';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/modal/modal';
import { Button } from '@/components/ui/button/button';
import { Alert, AlertDescription } from '@/components/ui/feedback/alert';
import { AlertTriangle } from 'lucide-react';

interface DeleteFuelTypeDialogProps {
  fuelType: FuelType | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  isDeleting?: boolean;
}

export function DeleteFuelTypeDialog({
  fuelType,
  onClose,
  onConfirm,
  isDeleting = false,
}: DeleteFuelTypeDialogProps) {
  const handleConfirm = async () => {
    if (!fuelType) return;
    await onConfirm(fuelType.id);
  };

  return (
    <Modal open={!!fuelType} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Delete Fuel Type</ModalTitle>
        </ModalHeader>
        <div className="space-y-4">
          <Alert variant="error">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This action cannot be undone. This will permanently delete the fuel type
              {fuelType && <span className="font-medium"> "{fuelType.name}"</span>} and remove all associated data.
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