import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { 
  Expense, 
  ExpenseWithDetails, 
  CreateExpenseDTO, 
  UpdateExpenseDTO, 
  ExpenseFilters,
  PaginatedResponse,
  SortConfig
} from '../types';

export const expenseApi = createApi({
  reducerPath: 'expenseApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    credentials: 'include',
  }),
  tagTypes: ['Expense'],
  endpoints: (builder) => ({
    getExpenses: builder.query<PaginatedResponse<ExpenseWithDetails>, ExpenseFilters & { page?: number; pageSize?: number; sort?: SortConfig }>({
      query: ({ sort, page, pageSize, ...filters }) => ({
        url: '/expenses',
        params: {
          ...filters,
          page,
          pageSize,
          sortField: sort?.field,
          sortOrder: sort?.order,
        },
      }),
      providesTags: ['Expense'],
    }),

    getExpenseById: builder.query<ExpenseWithDetails, string>({
      query: (id) => `/expenses/${id}`,
      providesTags: ['Expense'],
    }),

    createExpense: builder.mutation<Expense, CreateExpenseDTO>({
      query: (expense) => ({
        url: '/expenses',
        method: 'POST',
        body: expense,
      }),
      invalidatesTags: ['Expense'],
    }),

    updateExpense: builder.mutation<Expense, UpdateExpenseDTO>({
      query: ({ id, ...expense }) => ({
        url: `/expenses/${id}`,
        method: 'PUT',
        body: expense,
      }),
      invalidatesTags: ['Expense'],
    }),

    deleteExpense: builder.mutation<void, string>({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expense'],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useGetExpenseByIdQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi; 