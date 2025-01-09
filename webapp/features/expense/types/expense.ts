export interface Expense {
  id: string;
  vehicle_id: string;
  category_id: string;
  date: string;
  amount: number;
  vendor?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseWithDetails extends Expense {
  category: {
    id: string;
    name: string;
    color: string;
  };
}

export interface CreateExpenseDTO {
  vehicle_id: string;
  category_id: string;
  date: string;
  amount: number;
  vendor?: string;
  description?: string;
}

export interface UpdateExpenseDTO extends Partial<CreateExpenseDTO> {
  id: string;
}

export interface ExpenseFilters {
  vehicles?: string[];
  dateFrom?: string;
  dateTo?: string;
  categoryId?: string;
  vendor?: string;
}

export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: string;
  order: SortOrder;
} 