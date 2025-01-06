import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from '@/components/ui/modal/modal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/feedback/use-toast';
import { vehicleApi } from '../store/vehicleApi';
import { Vehicle } from '../types';

interface DeleteVehicleDialogProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
}

export function DeleteVehicleDialog({ vehicle, isOpen, onClose, onDelete }: DeleteVehicleDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const [deleteVehicle] = vehicleApi.useDeleteVehicleMutation();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteVehicle(vehicle.id);
      toast({
        title: 'Vehicle deleted',
        description: `${vehicle.make} ${vehicle.model} has been deleted successfully.`,
      });
      onDelete?.();
      onClose();
    } catch (error) {
      toast({
        variant: 'error',
        title: 'Error',
        description: 'Failed to delete vehicle. Please try again.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Delete Vehicle</ModalTitle>
          <ModalDescription>
            Are you sure you want to delete {vehicle.make} {vehicle.model}? This action cannot be undone.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
} 