'use client';

import { useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from '@/components/ui/modal/modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ExpenseWithDetails, UpdateExpenseDTO } from '@/features/expense/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/form';
import { Input } from '@/components/ui/input/input';
import { Textarea } from '@/components/ui/form/textarea';
import { Button } from '@/components/ui/button/button';
import { CategorySelect } from '../ExpenseLog/CategorySelect/CategorySelect';
import { useToast } from '@/components/ui/feedback/use-toast';
import { useUpdateExpenseMutation } from '../../store/expenseApi';

const expenseFormSchema = z.object({
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  date: z.string().min(1, 'Date is required'),
  category_id: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  vendor: z.string().optional(),
});

type ExpenseFormValues = z.infer<typeof expenseFormSchema>;

interface EditExpenseModalProps {
  expense: ExpenseWithDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EditExpenseModal({ expense, isOpen, onClose }: EditExpenseModalProps) {
  const { toast } = useToast();
  const [updateExpense] = useUpdateExpenseMutation();

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      amount: 0,
      date: '',
      category_id: '',
      description: '',
      vendor: '',
    },
  });

  useEffect(() => {
    if (expense) {
      form.reset({
        amount: expense.amount,
        date: expense.date,
        category_id: expense.category_id,
        description: expense.description || '',
        vendor: expense.vendor || '',
      });
    }
  }, [expense, form]);

  const handleSubmit = async (data: ExpenseFormValues) => {
    if (!expense) return;

    try {
      await updateExpense({
        id: expense.id,
        ...data,
      } as UpdateExpenseDTO).unwrap();

      toast({
        title: 'Success',
        description: 'Expense updated successfully',
        variant: 'success',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update expense',
        variant: 'error',
      });
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Edit Expense</ModalTitle>
          <ModalDescription>
            Update the expense details
          </ModalDescription>
        </ModalHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <CategorySelect
                      value={field.value}
                      onChange={field.onChange}
                      error={form.formState.errors.category_id?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vendor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter vendor name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any additional details about the expense"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </ModalContent>
    </Modal>
  );
} 