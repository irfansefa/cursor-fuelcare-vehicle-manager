'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { LineChart } from "@/components/ui/chart/line-chart";
import { Vehicle } from "../../types";
import { useGetFuelLogsQuery, type FuelLog } from "../../store/fuelLogApi";
import { useMemo, useState } from "react";
import { ChartDateRangeControls } from "./ChartDateRangeControls";
import { useGetFuelTypesQuery } from "@/features/fuel/store/fuelTypeApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/form/select";
import type { FuelType } from "@/features/fuel/types/fuelType";

interface ConsumptionTrendsProps {
  vehicle: Vehicle;
}

interface ConsumptionDataPoint {
  date: string;
  consumption: number;
  cost: number;
  fuelTypeId: string;
}

interface ExtendedFuelLog extends Omit<FuelLog, 'fuelType'> {
  fuelType: FuelType;
}

export function ConsumptionTrends({ vehicle }: ConsumptionTrendsProps) {
  const { data: fuelLogsData, isLoading: isLoadingLogs } = useGetFuelLogsQuery({
    vehicleId: vehicle.id,
    pageSize: 1000, // Get all logs for trend analysis
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

  const trendData = useMemo(() => {
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

    const dataPoints: ConsumptionDataPoint[] = [];

    // Calculate consumption for each fuel type
    fuelTypeGroups.forEach((logs, fuelTypeId) => {
      const sortedLogs = [...logs].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // Calculate consumption for each fill-up
      for (let i = 1; i < sortedLogs.length; i++) {
        const currentLog = sortedLogs[i];
        const previousLog = sortedLogs[i - 1];
        
        if (currentLog.odometer && previousLog.odometer) {
          const distance = currentLog.odometer - previousLog.odometer;
          if (distance > 0) {
            const consumption = (currentLog.quantity * 100) / distance; // L/100km or gal/100km
            const costPerKm = currentLog.totalCost / distance;

            dataPoints.push({
              date: currentLog.date.split('T')[0], // Format as YYYY-MM-DD
              consumption: Number(consumption.toFixed(2)),
              cost: Number((costPerKm * 100).toFixed(2)), // Cost per 100km for better visualization
              fuelTypeId,
            });
          }
        }
      }
    });

    // Filter by selected fuel type
    if (selectedFuelType !== 'all') {
      return dataPoints.filter(point => point.fuelTypeId === selectedFuelType);
    }

    return dataPoints;
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
        <CardTitle>Consumption Trends</CardTitle>
      </CardHeader>
      <CardContent>
        {trendData.length > 0 ? (
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

            <LineChart
              data={trendData}
              lines={[
                {
                  dataKey: "consumption",
                  stroke: "#2563eb", // blue-600
                  name: `Consumption (${selectedUnit === 'liters' ? 'L' : 'gal'}/100km)`,
                },
                {
                  dataKey: "cost",
                  stroke: "#dc2626", // red-600
                  name: "Cost ($/100km)",
                },
              ]}
              xAxisDataKey="date"
              height={400}
              showGrid={true}
              showLegend={true}
              showTooltip={true}
            />
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