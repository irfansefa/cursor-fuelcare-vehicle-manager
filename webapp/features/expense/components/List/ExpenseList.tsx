'use client';

import { useState } from 'react';
import { useGetExpensesQuery, useDeleteExpenseMutation } from '@/features/expense/store/expenseApi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { ExpenseFilters } from './ExpenseFilters';
import { Alert, AlertDescription } from '@/components/ui/feedback/alert';
import { Skeleton } from '@/components/ui/feedback/skeleton';
import { AlertCircle, ArrowDown, ArrowUp, Pencil, Trash2 } from 'lucide-react';
import { Pagination } from '@/components/ui/navigation/pagination';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/feedback/use-toast';
import { DeleteExpenseDialog } from './DeleteExpenseDialog';
import { EditExpenseModal } from './EditExpenseModal';
import type { ExpenseFilters as ExpenseFiltersType, SortConfig, SortOrder, ExpenseWithDetails } from '@/features/expense/types';

interface ExpenseListProps {
  vehicleId: string;
}

type SortField = 'date' | 'amount' | 'category' | 'vendor';

export function ExpenseList({ vehicleId }: ExpenseListProps) {
  const [filters, setFilters] = useState<ExpenseFiltersType>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState<SortConfig>({ field: 'date', order: 'desc' });
  const [expenseToDelete, setExpenseToDelete] = useState<ExpenseWithDetails | null>(null);
  const [expenseToEdit, setExpenseToEdit] = useState<ExpenseWithDetails | null>(null);
  const { toast } = useToast();

  const { data: response, isLoading, error } = useGetExpensesQuery({ 
    vehicleId,
    ...filters,
    page,
    pageSize,
    sort
  });

  const [deleteExpense, { isLoading: isDeleting }] = useDeleteExpenseMutation();

  const handleSort = (field: SortField) => {
    setSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when changing page size
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExpense(id).unwrap();
      toast({
        title: 'Success',
        description: 'Expense deleted successfully',
        variant: 'success',
      });
      setExpenseToDelete(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete expense',
        variant: 'error',
      });
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sort.field !== field) return null;
    return sort.order === 'desc' ? (
      <ArrowDown className="inline ml-1" />
    ) : (
      <ArrowUp className="inline ml-1" />
    );
  };

  const renderLoadingState = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-10" />
        ))}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(3)].map((_, i) => (
            <TableRow key={i}>
              {[...Array(6)].map((_, j) => (
                <TableCell key={j}>
                  <Skeleton className="h-6" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderErrorState = () => (
    <Alert variant="error">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Failed to load expenses. Please try again later.
      </AlertDescription>
    </Alert>
  );

  const renderEmptyState = () => (
    <div className="text-center py-8 text-muted-foreground">
      No expenses found for the selected filters
    </div>
  );

  if (isLoading) {
    return renderLoadingState();
  }

  if (error) {
    return renderErrorState();
  }

  const expenses = response?.data || [];
  const meta = response?.meta;

  return (
    <div className="space-y-6">
      <ExpenseFilters filters={filters} onFiltersChange={setFilters} />
      
      {!expenses.length ? (
        renderEmptyState()
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:text-primary"
                  onClick={() => handleSort('date')}
                >
                  Date {renderSortIcon('date')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-primary"
                  onClick={() => handleSort('category')}
                >
                  Category {renderSortIcon('category')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-primary"
                  onClick={() => handleSort('amount')}
                >
                  Amount {renderSortIcon('amount')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-primary"
                  onClick={() => handleSort('vendor')}
                >
                  Vendor {renderSortIcon('vendor')}
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{formatDate(expense.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {expense.category ? (
                        <>
                          <div className={`w-3 h-3 rounded-full ${expense.category.color}`} />
                          {expense.category.name}
                        </>
                      ) : (
                        <span className="text-muted-foreground italic">Deleted Category</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(expense.amount)}</TableCell>
                  <TableCell>{expense.vendor || '-'}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {expense.description || '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpenseToEdit(expense)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpenseToDelete(expense)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {meta && (
            <Pagination
              currentPage={meta.currentPage}
              totalPages={meta.totalPages}
              pageSize={meta.pageSize}
              totalItems={meta.totalCount}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </>
      )}

      <DeleteExpenseDialog
        expense={expenseToDelete}
        onClose={() => setExpenseToDelete(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />

      <EditExpenseModal
        expense={expenseToEdit}
        isOpen={!!expenseToEdit}
        onClose={() => setExpenseToEdit(null)}
      />
    </div>
  );
} 