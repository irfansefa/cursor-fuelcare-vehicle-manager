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
import { useAddFuelLogMutation } from '../../store/fuelLogApi';

interface AddFuelLogModalProps {
  vehicleId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AddFuelLogModal({ vehicleId, isOpen, onClose }: AddFuelLogModalProps) {
  const { toast } = useToast();
  const [addFuelLog] = useAddFuelLogMutation();

  const handleSubmit = async (data: FuelLogFormValues) => {
    try {
      await addFuelLog({ vehicleId, ...data }).unwrap();
      toast({
        title: 'Success',
        description: 'Fuel log added successfully',
        variant: 'success',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add fuel log',
        variant: 'error',
      });
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Add Fuel Log</ModalTitle>
          <ModalDescription>
            Record a new fuel log for your vehicle
          </ModalDescription>
        </ModalHeader>
        <FuelLogForm onSubmit={handleSubmit} vehicleId={vehicleId} />
      </ModalContent>
    </Modal>
  );
} 