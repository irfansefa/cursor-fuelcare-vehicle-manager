'use client';

import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from '@/components/ui/modal/modal';
import { FuelLogForm, FuelLogFormValues } from './FuelLogForm';
import { useToast } from '@/components/ui/feedback/use-toast';
import { useUpdateFuelLogMutation } from '../../store/fuelLogApi';

interface EditFuelLogModalProps {
  fuelLog: FuelLogFormValues & { id: string };
  vehicleId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EditFuelLogModal({
  fuelLog,
  vehicleId,
  isOpen,
  onClose,
}: EditFuelLogModalProps) {
  const { toast } = useToast();
  const [updateFuelLog, { isLoading }] = useUpdateFuelLogMutation();

  // Format the date to YYYY-MM-DD for the form
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const defaultValues = {
    ...fuelLog,
    date: formatDateForInput(fuelLog.date),
  };

  const handleSubmit = async (data: FuelLogFormValues) => {
    try {
      await updateFuelLog({
        id: fuelLog.id,
        vehicleId,
        fuelLog: data,
      }).unwrap();
      
      toast({
        title: 'Success',
        description: 'Fuel log updated successfully',
        variant: 'success',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update fuel log',
        variant: 'error',
      });
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Edit Fuel Log</ModalTitle>
          <ModalDescription>
            Update the fuel log details
          </ModalDescription>
        </ModalHeader>
        <FuelLogForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          isSubmitting={isLoading}
        />
      </ModalContent>
    </Modal>
  );
} 