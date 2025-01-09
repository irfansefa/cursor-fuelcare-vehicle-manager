'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card/card';
import { DateRangePicker } from '@/components/ui/input/date-range-picker';
import { LineChart } from '@/components/ui/chart/line-chart';
import { useVehicleExpenseAnalytics } from '@/features/expense/hooks/useVehicleExpenseAnalytics';
import { formatCurrency } from '@/lib/formatters';
import { DateRange } from '@/features/expense/types';
import { Skeleton } from '@/components/ui/feedback/skeleton';
import { Alert, AlertDescription } from '@/components/ui/feedback/alert';
import { AlertCircle, ArrowDown, ArrowUp } from 'lucide-react';

interface TrendAnalysisProps {
  vehicleId: string;
}

export function TrendAnalysis({ vehicleId }: TrendAnalysisProps) {
  const [dateRange, setDateRange] = useState<DateRange>({});
  const { data, isLoading, error } = useVehicleExpenseAnalytics({ vehicleId, dateRange });

  const renderMetricSkeleton = () => (
    <Card className="p-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-32" />
      </div>
    </Card>
  );

  const renderChartSkeleton = () => (
    <Card className="p-4">
      <div className="space-y-4">
        <Skeleton className="h-[300px] w-full" />
      </div>
    </Card>
  );

  if (error) {
    return (
      <Alert variant="error">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load expense trends. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-10 w-72" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i}>{renderMetricSkeleton()}</div>
          ))}
        </div>

        {renderChartSkeleton()}
      </div>
    );
  }

  const { monthlyTotals, totalExpenses, averageExpense, yearOverYear } = data;

  // Current year data
  const chartData = monthlyTotals.map(item => ({
    x: item.month,
    y: item.total,
  }));

  // Combined chart data for year-over-year comparison
  const combinedChartData = yearOverYear.currentYear.map((current, index) => {
    const previousMonth = yearOverYear.previousYear[index];
    return {
      month: current.month.substring(5), // Get MM from YYYY-MM
      current: current.total,
      previous: previousMonth?.total || 0,
    };
  });

  const monthlyChange = monthlyTotals.length >= 2
    ? monthlyTotals[monthlyTotals.length - 1].total - monthlyTotals[monthlyTotals.length - 2].total
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Expense Trends</h3>
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Total Expenses</span>
            <div className="text-2xl font-semibold">
              {formatCurrency(totalExpenses)}
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Average Monthly</span>
            <div className="text-2xl font-semibold">
              {formatCurrency(averageExpense)}
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Year over Year</span>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-semibold">
                {yearOverYear.yearOverYearChange.toFixed(1)}%
              </div>
              {yearOverYear.yearOverYearChange > 0 ? (
                <ArrowUp className="text-destructive" />
              ) : yearOverYear.yearOverYearChange < 0 ? (
                <ArrowDown className="text-success" />
              ) : null}
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="space-y-6">
          <h4 className="text-sm font-medium">Monthly Comparison</h4>
          <LineChart
            data={combinedChartData}
            xAxisDataKey="month"
            xAxisLabel="Month"
            yAxisLabel="Expenses"
            height={300}
            formatYAxis={(value) => formatCurrency(value)}
            formatTooltip={(value) => formatCurrency(value)}
            lines={[
              { dataKey: 'current', name: 'Current Year', stroke: 'var(--primary)' },
              { dataKey: 'previous', name: 'Previous Year', stroke: 'var(--muted)' },
            ]}
          />
        </div>
      </Card>
    </div>
  );
} 