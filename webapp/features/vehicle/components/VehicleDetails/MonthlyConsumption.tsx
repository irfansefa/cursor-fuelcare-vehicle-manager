'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { BarChart } from "@/components/ui/chart/bar-chart";
import { Vehicle } from "../../types";
import { useGetFuelLogsQuery, type FuelLog } from "../../store/fuelLogApi";
import { useMemo, useState } from "react";
import { ChartDateRangeControls } from "./ChartDateRangeControls";
import { useGetFuelTypesQuery } from "@/features/fuel/store/fuelTypeApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/form/select";
import type { FuelType } from "@/features/fuel/types/fuelType";

interface MonthlyConsumptionProps {
  vehicle: Vehicle;
}

interface MonthlyData {
  month: string;
  avgConsumption: number;
  avgCost: number;
  totalDistance: number;
  totalFuel: number;
  fuelTypeId: string;
}

interface ExtendedFuelLog extends Omit<FuelLog, 'fuelType'> {
  fuelType: FuelType;
}

export function MonthlyConsumption({ vehicle }: MonthlyConsumptionProps) {
  const { data: fuelLogsData, isLoading: isLoadingLogs } = useGetFuelLogsQuery({
    vehicleId: vehicle.id,
    pageSize: 1000,
    sortField: 'date',
    sortOrder: 'asc',
  });

  const { data: fuelTypes, isLoading: isLoadingTypes } = useGetFuelTypesQuery({
    status: 'active'
  });

  const [selectedFuelType, setSelectedFuelType] = useState<string>('all');

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
    if (!fuelLogsData?.data || !fuelTypes) return [];

    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59); // Include the entire end date

    const filteredLogs = fuelLogsData.data.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= startDate && logDate <= endDate;
    });

    // Add fuel type information to logs
    const logsWithFuelType = filteredLogs.map(log => {
      const fuelType = fuelTypes.find(ft => ft.id === log.fuelTypeId);
      if (!fuelType) return null;
      return {
        ...log,
        fuelType,
      };
    }).filter((log): log is ExtendedFuelLog => log !== null);

    // Group logs by fuel type
    const fuelTypeGroups = new Map<string, ExtendedFuelLog[]>();

    // Initialize groups
    logsWithFuelType.forEach(log => {
      if (!fuelTypeGroups.has(log.fuelTypeId)) {
        fuelTypeGroups.set(log.fuelTypeId, []);
      }
      fuelTypeGroups.get(log.fuelTypeId)!.push(log);
    });

    const monthlyStats = new Map<string, Map<string, {
      totalFuel: number;
      totalCost: number;
      distances: number[];
      quantities: number[];
    }>>();

    // Calculate distances and aggregate monthly data for each fuel type
    fuelTypeGroups.forEach((logs, fuelTypeId) => {
      const sortedLogs = [...logs].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      for (let i = 1; i < sortedLogs.length; i++) {
        const currentLog = sortedLogs[i];
        const previousLog = sortedLogs[i - 1];
        
        const monthKey = new Date(currentLog.date).toISOString().slice(0, 7); // YYYY-MM format
        
        if (!monthlyStats.has(monthKey)) {
          monthlyStats.set(monthKey, new Map());
        }

        const monthStats = monthlyStats.get(monthKey)!;
        if (!monthStats.has(fuelTypeId)) {
          monthStats.set(fuelTypeId, {
            totalFuel: 0,
            totalCost: 0,
            distances: [],
            quantities: [],
          });
        }

        const stats = monthStats.get(fuelTypeId)!;
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
    });

    // Convert to array and calculate averages
    const allMonthlyData: MonthlyData[] = [];

    monthlyStats.forEach((fuelTypeStats, month) => {
      fuelTypeStats.forEach((stats, fuelTypeId) => {
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

        allMonthlyData.push({
          month: displayMonth,
          avgConsumption: Number(avgConsumption.toFixed(2)),
          avgCost: Number(avgCost.toFixed(2)),
          totalDistance: Number(totalDistance.toFixed(1)),
          totalFuel: Number(stats.totalFuel.toFixed(1)),
          fuelTypeId,
        });
      });
    });

    // Filter by selected fuel type
    if (selectedFuelType !== 'all') {
      return allMonthlyData.filter(data => data.fuelTypeId === selectedFuelType);
    }

    return allMonthlyData;
  }, [fuelLogsData?.data, fuelTypes, dateRange, selectedFuelType]);

  const isLoading = isLoadingLogs || isLoadingTypes;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Get the unit for the selected fuel type
  const selectedUnit = selectedFuelType !== 'all'
    ? fuelTypes?.find(ft => ft.id === selectedFuelType)?.unit || 'liters'
    : 'liters';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {monthlyData.length > 0 ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <ChartDateRangeControls
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                onRangeChange={(startDate, endDate) => setDateRange({ startDate, endDate })}
                minDate={minDate}
                maxDate={maxDate}
              />

              <Select
                value={selectedFuelType}
                onValueChange={setSelectedFuelType}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fuel Types</SelectItem>
                  {fuelTypes?.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium">
                Average Consumption ({selectedUnit === 'liters' ? 'L' : 'gal'}/100km)
              </h4>
              <BarChart
                data={monthlyData}
                bars={[
                  {
                    dataKey: "avgConsumption",
                    fill: "#2563eb", // blue-600
                    name: `${selectedUnit === 'liters' ? 'L' : 'gal'}/100km`,
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