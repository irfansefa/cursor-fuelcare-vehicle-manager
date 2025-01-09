'use client';

import { useState } from 'react';
import { FuelType, CreateFuelTypeDTO, UpdateFuelTypeDTO } from '@/features/fuel/types';
import { FuelTypeList } from '@/features/fuel/components/FuelType/List';
import { FuelTypeForm } from '@/features/fuel/components/FuelType/Form';
import { DeleteFuelTypeDialog } from '@/features/fuel/components/FuelType/List/DeleteFuelTypeDialog';
import {
  useGetFuelTypesQuery,
  useCreateFuelTypeMutation,
  useUpdateFuelTypeMutation,
  useDeleteFuelTypeMutation
} from '@/features/fuel/store/fuelTypeApi';
import { Button } from '@/components/ui/button/button';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/modal/modal';
import { useToast } from '@/components/ui/feedback/use-toast';
import { Plus } from 'lucide-react';

type SubmitHandler<T> = (data: T) => Promise<void>;

export default function FuelTypesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingFuelType, setEditingFuelType] = useState<FuelType | null>(null);
  const [deletingFuelType, setDeletingFuelType] = useState<FuelType | null>(null);
  const { data: fuelTypes = [], isLoading } = useGetFuelTypesQuery({});
  const [createFuelType] = useCreateFuelTypeMutation();
  const [updateFuelType] = useUpdateFuelTypeMutation();
  const [deleteFuelType, { isLoading: isDeleting }] = useDeleteFuelTypeMutation();
  const { toast } = useToast();

  const handleCreate: SubmitHandler<CreateFuelTypeDTO> = async (data) => {
    try {
      await createFuelType(data).unwrap();
      toast({
        title: 'Success',
        description: 'Fuel type created successfully',
        variant: 'success',
      });
      setIsAddModalOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create fuel type',
        variant: 'error',
      });
    }
  };

  const handleEdit: SubmitHandler<UpdateFuelTypeDTO> = async (data) => {
    try {
      await updateFuelType(data).unwrap();
      toast({
        title: 'Success',
        description: 'Fuel type updated successfully',
        variant: 'success',
      });
      setEditingFuelType(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update fuel type',
        variant: 'error',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFuelType(id).unwrap();
      toast({
        title: 'Success',
        description: 'Fuel type deleted successfully',
        variant: 'success',
      });
      setDeletingFuelType(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete fuel type',
        variant: 'error',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Fuel Types</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Fuel Type
        </Button>
      </div>

      <FuelTypeList
        fuelTypes={fuelTypes}
        onEdit={setEditingFuelType}
        onDelete={setDeletingFuelType}
      />

      <Modal open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Add Fuel Type</ModalTitle>
          </ModalHeader>
          <FuelTypeForm
            onSubmit={handleCreate}
          />
        </ModalContent>
      </Modal>

      <Modal open={!!editingFuelType} onOpenChange={() => setEditingFuelType(null)}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit Fuel Type</ModalTitle>
          </ModalHeader>
          {editingFuelType && (
            <FuelTypeForm
              fuelType={editingFuelType}
              onSubmit={handleEdit}
            />
          )}
        </ModalContent>
      </Modal>

      <DeleteFuelTypeDialog
        fuelType={deletingFuelType}
        onClose={() => setDeletingFuelType(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
} 