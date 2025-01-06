'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { BarChart } from "@/components/ui/chart/bar-chart";
import { Vehicle } from "../../types";
import { useGetFuelLogsQuery } from "../../store/fuelLogApi";
import { useMemo, useState } from "react";
import { ChartDateRangeControls } from "./ChartDateRangeControls";

interface MonthlyConsumptionProps {
  vehicle: Vehicle;
}

interface MonthlyData {
  month: string;
  avgConsumption: number;
  avgCost: number;
  totalDistance: number;
  totalFuel: number;
}

export function MonthlyConsumption({ vehicle }: MonthlyConsumptionProps) {
  const { data: fuelLogsData, isLoading } = useGetFuelLogsQuery({
    vehicleId: vehicle.id,
    pageSize: 1000,
    sortField: 'date',
    sortOrder: 'asc',
  });

  // Get min and max dates from data
  const { minDate, maxDate } = useMemo(() => {
    if (!fuelLogsData?.data?.length) return { minDate: undefined, maxDate: undefined };
    
    const timestamps = fuelLogsData.data.map(log => new Date(log.date).getTime());
    return {
      minDate: new Date(Math.min(...timestamps)).toISOString().split('T')[0],
      maxDate: new Date(Math.max(...timestamps)).toISOString().split('T')[0],
    };
  }, [fuelLogsData?.data]);

  // Initialize date range state
  const [dateRange, setDateRange] = useState(() => ({
    startDate: minDate || new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().split('T')[0],
    endDate: maxDate || new Date().toISOString().split('T')[0],
  }));

  const monthlyData = useMemo(() => {
    if (!fuelLogsData?.data) return [];

    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59); // Include the entire end date

    const filteredLogs = fuelLogsData.data.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= startDate && logDate <= endDate;
    });

    const sortedLogs = [...filteredLogs].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const monthlyStats = new Map<string, {
      totalFuel: number;
      totalCost: number;
      distances: number[];
      quantities: number[];
    }>();

    // Calculate distances and aggregate monthly data
    for (let i = 1; i < sortedLogs.length; i++) {
      const currentLog = sortedLogs[i];
      const previousLog = sortedLogs[i - 1];
      
      const monthKey = new Date(currentLog.date).toISOString().slice(0, 7); // YYYY-MM format
      
      if (!monthlyStats.has(monthKey)) {
        monthlyStats.set(monthKey, {
          totalFuel: 0,
          totalCost: 0,
          distances: [],
          quantities: [],
        });
      }

      const stats = monthlyStats.get(monthKey)!;
      stats.totalFuel += currentLog.quantity;
      stats.totalCost += currentLog.totalCost;
      
      if (currentLog.odometer && previousLog.odometer) {
        const distance = currentLog.odometer - previousLog.odometer;
        if (distance > 0) {
          stats.distances.push(distance);
          stats.quantities.push(currentLog.quantity);
        }
      }
    }

    // Convert to array and calculate averages
    return Array.from(monthlyStats.entries()).map(([month, stats]) => {
      const totalDistance = stats.distances.reduce((sum, d) => sum + d, 0);
      const avgConsumption = totalDistance > 0 
        ? (stats.totalFuel * 100) / totalDistance 
        : 0;
      const avgCost = totalDistance > 0 
        ? (stats.totalCost * 100) / totalDistance 
        : 0;

      // Format month for display (e.g., "Jan 2023")
      const [year, monthNum] = month.split('-');
      const monthName = new Date(`${year}-${monthNum}-01`).toLocaleString('default', { month: 'short' });
      const displayMonth = `${monthName} ${year}`;

      return {
        month: displayMonth,
        avgConsumption: Number(avgConsumption.toFixed(2)),
        avgCost: Number(avgCost.toFixed(2)),
        totalDistance: Number(totalDistance.toFixed(1)),
        totalFuel: Number(stats.totalFuel.toFixed(1)),
      };
    });
  }, [fuelLogsData?.data, dateRange]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {monthlyData.length > 0 ? (
          <div className="space-y-6">
            <ChartDateRangeControls
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onRangeChange={(startDate, endDate) => setDateRange({ startDate, endDate })}
              minDate={minDate}
              maxDate={maxDate}
            />

            <div>
              <h4 className="mb-2 text-sm font-medium">Average Consumption (L/100km)</h4>
              <BarChart
                data={monthlyData}
                bars={[
                  {
                    dataKey: "avgConsumption",
                    fill: "#2563eb", // blue-600
                    name: "L/100km",
                  }
                ]}
                xAxisDataKey="month"
                height={200}
                showGrid={true}
                showLegend={false}
                showTooltip={true}
              />
            </div>
            
            <div>
              <h4 className="mb-2 text-sm font-medium">Average Cost ($/100km)</h4>
              <BarChart
                data={monthlyData}
                bars={[
                  {
                    dataKey: "avgCost",
                    fill: "#dc2626", // red-600
                    name: "$/100km",
                  }
                ]}
                xAxisDataKey="month"
                height={200}
                showGrid={true}
                showLegend={false}
                showTooltip={true}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No data available for the selected date range. Try adjusting the dates or add more fuel logs.
          </div>
        )}
      </CardContent>
    </Card>
  );
} 