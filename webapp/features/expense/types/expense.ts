export interface Expense {
  id: string;
  user_id: string;
  vehicle_id: string;
  category_id: string;
  date: string;
  amount: number;
  description?: string;
  vendor?: string;
  receipt_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateExpenseDTO {
  vehicle_id: string;
  category_id: string;
  date: string;
  amount: number;
  description?: string;
  vendor?: string;
}

export interface UpdateExpenseDTO extends Partial<CreateExpenseDTO> {
  id: string;
}

export interface ExpenseFilters {
  dateRange?: {
    from: string;
    to: string;
  };
  categories?: string[];
  vehicles?: string[];
  search?: string;
}

export interface ExpenseWithDetails extends Expense {
  vehicle: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
    color: string;
  };
} 