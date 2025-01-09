'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card/card';
import { DateRangePicker } from '@/components/ui/input/date-range-picker';
import { PieChart } from '@/components/ui/chart/pie-chart';
import { useVehicleExpenseAnalytics } from '@/features/expense/hooks/useVehicleExpenseAnalytics';
import { formatCurrency } from '@/lib/formatters';
import { getTailwindColorValue } from '@/lib/utils';
import { DateRange } from '@/features/expense/types';

interface CategoryBreakdownProps {
  vehicleId: string;
}

export function CategoryBreakdown({ vehicleId }: CategoryBreakdownProps) {
  const [dateRange, setDateRange] = useState<DateRange>({});
  const { data, isLoading, error } = useVehicleExpenseAnalytics({ vehicleId, dateRange });

  if (error) {
    return (
      <div className="text-destructive">
        Failed to load category breakdown
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { categoryTotals, totalExpenses } = data;

  const chartData = categoryTotals.map(category => ({
    name: category.categoryName,
    value: category.total,
    color: getTailwindColorValue(category.categoryColor),
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Expense Categories</h3>
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4 min-h-[400px]">
          <PieChart
            data={chartData}
            height={350}
          />
        </Card>

        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Expenses</span>
              <span className="text-lg font-semibold">
                {formatCurrency(totalExpenses)}
              </span>
            </div>

            <div className="space-y-2">
              {categoryTotals.map(category => (
                <div
                  key={category.categoryId}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getTailwindColorValue(category.categoryColor) }}
                    />
                    <span className="text-sm">{category.categoryName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {formatCurrency(category.total)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({category.percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 