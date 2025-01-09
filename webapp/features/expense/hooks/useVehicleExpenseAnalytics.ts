import { useGetExpensesQuery } from '../store/expenseApi';
import { calculateCategoryTotals, calculateMonthlyTotals, calculateYearOverYear } from '../utils/analytics';
import { DateRange } from '../types';

interface UseVehicleExpenseAnalyticsProps {
  vehicleId: string;
  dateRange?: DateRange;
}

export function useVehicleExpenseAnalytics({ vehicleId, dateRange }: UseVehicleExpenseAnalyticsProps) {
  const { data: response, isLoading, error } = useGetExpensesQuery({
    vehicles: [vehicleId],
    dateFrom: dateRange?.from,
    dateTo: dateRange?.to,
  });

  const expenses = response?.data || [];

  const categoryTotals = calculateCategoryTotals(expenses);
  const monthlyTotals = calculateMonthlyTotals(expenses);
  const yearOverYear = calculateYearOverYear(expenses);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  return {
    isLoading,
    error,
    data: {
      categoryTotals,
      monthlyTotals,
      totalExpenses,
      averageExpense,
      yearOverYear,
    },
  };
} 