export * from './expense';
export * from './category'; 

export interface ExpenseFilters {
  vehicles?: string[];
  dateFrom?: string;
  dateTo?: string;
  categoryId?: string;
  vendor?: string;
} 