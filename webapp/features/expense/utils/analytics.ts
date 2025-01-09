import { ExpenseWithDetails } from '../types';

interface CategoryTotal {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  total: number;
  percentage: number;
}

interface MonthlyTotal {
  month: string;  // YYYY-MM format
  total: number;
}

interface YearOverYearData {
  currentYear: MonthlyTotal[];
  previousYear: MonthlyTotal[];
  yearOverYearChange: number;
}

export function calculateCategoryTotals(expenses: ExpenseWithDetails[]): CategoryTotal[] {
  // Calculate total amount for all expenses
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Group expenses by category and calculate totals
  const categoryMap = new Map<string, CategoryTotal>();

  expenses.forEach(expense => {
    const existing = categoryMap.get(expense.category_id);
    if (existing) {
      existing.total += expense.amount;
    } else {
      categoryMap.set(expense.category_id, {
        categoryId: expense.category_id,
        categoryName: expense.category.name,
        categoryColor: expense.category.color,
        total: expense.amount,
        percentage: 0, // Will be calculated below
      });
    }
  });

  // Calculate percentages and convert to array
  return Array.from(categoryMap.values()).map(category => ({
    ...category,
    percentage: (category.total / totalAmount) * 100,
  }));
}

export function calculateMonthlyTotals(expenses: ExpenseWithDetails[]): MonthlyTotal[] {
  // Group expenses by month and calculate totals
  const monthlyMap = new Map<string, number>();

  expenses.forEach(expense => {
    const month = expense.date.substring(0, 7); // Get YYYY-MM from YYYY-MM-DD
    const existing = monthlyMap.get(month) || 0;
    monthlyMap.set(month, existing + expense.amount);
  });

  // Convert to array and sort by month
  return Array.from(monthlyMap.entries())
    .map(([month, total]) => ({ month, total }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export function calculateYearOverYear(expenses: ExpenseWithDetails[]): YearOverYearData {
  // Get current year and previous year
  const now = new Date();
  const currentYear = now.getFullYear();
  const previousYear = currentYear - 1;

  // Group expenses by year and month
  const currentYearExpenses = expenses.filter(expense => 
    expense.date.startsWith(currentYear.toString())
  );
  const previousYearExpenses = expenses.filter(expense => 
    expense.date.startsWith(previousYear.toString())
  );

  // Calculate monthly totals for each year
  const currentYearTotals = calculateMonthlyTotals(currentYearExpenses);
  const previousYearTotals = calculateMonthlyTotals(previousYearExpenses);

  // Calculate year-over-year change (percentage)
  const currentYearTotal = currentYearExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const previousYearTotal = previousYearExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const yearOverYearChange = previousYearTotal > 0 
    ? ((currentYearTotal - previousYearTotal) / previousYearTotal) * 100 
    : 0;

  return {
    currentYear: currentYearTotals,
    previousYear: previousYearTotals,
    yearOverYearChange,
  };
}

export function formatMonthYear(month: string): string {
  return new Date(month + '-01').toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
} 