'use client';

import { useState } from 'react';
import { Category, CreateCategoryDTO, UpdateCategoryDTO } from '@/features/expense/types';
import { CategoryList } from '@/features/expense/components/Category/List';
import { CategoryForm } from '@/features/expense/components/Category/Form';
import { DeleteCategoryDialog } from '@/features/expense/components/Category/List/DeleteCategoryDialog';
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} from '@/features/expense/store/categoryApi';
import { Button } from '@/components/ui/button/button';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/modal/modal';
import { useToast } from '@/components/ui/feedback/use-toast';
import { Plus } from 'lucide-react';

type SubmitHandler<T> = (data: T) => Promise<void>;

export default function CategoriesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const { data: categories = [], isLoading } = useGetCategoriesQuery({});
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const { toast } = useToast();

  const handleCreate: SubmitHandler<CreateCategoryDTO> = async (data) => {
    try {
      await createCategory(data).unwrap();
      toast({
        title: 'Success',
        description: 'Category created successfully',
        variant: 'success',
      });
      setIsAddModalOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create category',
        variant: 'error',
      });
    }
  };

  const handleEdit: SubmitHandler<UpdateCategoryDTO> = async (data) => {
    try {
      await updateCategory(data).unwrap();
      toast({
        title: 'Success',
        description: 'Category updated successfully',
        variant: 'success',
      });
      setEditingCategory(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update category',
        variant: 'error',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      toast({
        title: 'Success',
        description: 'Category deleted successfully',
        variant: 'success',
      });
      setDeletingCategory(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete category',
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
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <CategoryList
        categories={categories}
        onEdit={setEditingCategory}
        onDelete={setDeletingCategory}
      />

      <Modal open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Add Category</ModalTitle>
          </ModalHeader>
          <CategoryForm
            onSubmit={handleCreate}
          />
        </ModalContent>
      </Modal>

      <Modal open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit Category</ModalTitle>
          </ModalHeader>
          {editingCategory && (
            <CategoryForm
              category={editingCategory}
              onSubmit={handleEdit}
            />
          )}
        </ModalContent>
      </Modal>

      <DeleteCategoryDialog
        category={deletingCategory}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
} 