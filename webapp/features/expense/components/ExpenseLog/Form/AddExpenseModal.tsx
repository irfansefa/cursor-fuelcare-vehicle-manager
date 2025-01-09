'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from '@/components/ui/modal/modal';
import { ExpenseForm, ExpenseFormValues } from './ExpenseForm';
import { useToast } from '@/components/ui/feedback/use-toast';
import { useCreateExpenseMutation } from '@/features/expense/store/expenseApi';

interface AddExpenseModalProps {
  vehicleId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AddExpenseModal({ vehicleId, isOpen, onClose }: AddExpenseModalProps) {
  const { toast } = useToast();
  const [createExpense] = useCreateExpenseMutation();

  const handleSubmit = async (data: ExpenseFormValues) => {
    try {
      await createExpense({ ...data, vehicle_id: vehicleId }).unwrap();
      toast({
        title: 'Success',
        description: 'Expense added successfully',
        variant: 'success',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add expense',
        variant: 'error',
      });
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Add Expense</ModalTitle>
          <ModalDescription>
            Record a new expense for your vehicle
          </ModalDescription>
        </ModalHeader>
        <ExpenseForm onSubmit={handleSubmit} vehicleId={vehicleId} />
      </ModalContent>
    </Modal>
  );
} 