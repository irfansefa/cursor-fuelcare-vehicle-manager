'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Vehicle } from "../../types";
import { useGetFuelLogsQuery } from "../../store/fuelLogApi";
import { useGetFuelTypesQuery } from "@/features/fuel/store/fuelTypeApi";
import { useMemo, useState } from "react";
import { ChartDateRangeControls } from "./ChartDateRangeControls";
import { LineChart } from "@/components/ui/chart/line-chart";
import { BarChart } from "@/components/ui/chart/bar-chart";
import { calculateConsumptionMetrics } from "../../utils/consumption";
import type { FuelType } from "@/features/fuel/types/fuelType";

interface FuelTypeAnalyticsProps {
  vehicle: Vehicle;
}

interface FuelTypeUsage {
  fuelTypeId: string;
  name: string;
  totalQuantity: number;
  totalCost: number;
  fillUps: number;
  averageQuantity: number;
  averageCost: number;
  unit: 'liters' | 'gallons';
}

interface TransitionData {
  date: string;
  fromType: string;
  toType: string;
  reason?: string;
}

export function FuelTypeAnalytics({ vehicle }: FuelTypeAnalyticsProps) {
  const { data: fuelLogsData, isLoading: isLoadingLogs } = useGetFuelLogsQuery({
    vehicleId: vehicle.id,
    pageSize: 1000,
    sortField: 'date',
    sortOrder: 'asc',
  });

  const { data: fuelTypes, isLoading: isLoadingTypes } = useGetFuelTypesQuery({
    status: 'active'
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

  // Calculate consumption metrics
  const metrics = useMemo(() => {
    if (!fuelLogsData?.data) return null;
    
    // Transform API FuelLog to internal FuelLog type
    const transformedLogs = fuelLogsData.data.map(log => {
      // Handle nullable fields
      const { location, notes, ...rest } = log;
      
      return {
        ...rest,
        location: location || undefined,
        notes: notes || undefined,
        fuelType: {
          id: log.fuelTypeId,
          name: '', // These fields are not used in consumption calculation
          unit: 'liters' as const,
          status: 'active' as const
        }
      };
    });
    
    return calculateConsumptionMetrics(transformedLogs);
  }, [fuelLogsData?.data]);

  // Calculate fuel type usage statistics
  const usageStats = useMemo(() => {
    if (!fuelLogsData?.data || !fuelTypes) return [];

    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59);

    const filteredLogs = fuelLogsData.data.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= startDate && logDate <= endDate;
    });

    const stats = new Map<string, FuelTypeUsage>();

    // Initialize stats for each fuel type
    fuelTypes.forEach(type => {
      stats.set(type.id, {
        fuelTypeId: type.id,
        name: type.name,
        totalQuantity: 0,
        totalCost: 0,
        fillUps: 0,
        averageQuantity: 0,
        averageCost: 0,
        unit: type.unit,
      });
    });

    // Calculate statistics
    filteredLogs.forEach(log => {
      const stat = stats.get(log.fuelTypeId);
      if (stat) {
        stat.totalQuantity += log.quantity;
        stat.totalCost += log.totalCost;
        stat.fillUps += 1;
      }
    });

    // Calculate averages
    stats.forEach(stat => {
      if (stat.fillUps > 0) {
        stat.averageQuantity = Number((stat.totalQuantity / stat.fillUps).toFixed(2));
        stat.averageCost = Number((stat.totalCost / stat.fillUps).toFixed(2));
      }
    });

    return Array.from(stats.values());
  }, [fuelLogsData?.data, fuelTypes, dateRange]);

  // Analyze fuel type transitions
  const transitions = useMemo(() => {
    if (!fuelLogsData?.data || !fuelTypes) return [];

    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59);

    const filteredLogs = fuelLogsData.data
      .filter(log => {
        const logDate = new Date(log.date);
        return logDate >= startDate && logDate <= endDate;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const transitionData: TransitionData[] = [];

    for (let i = 1; i < filteredLogs.length; i++) {
      const currentLog = filteredLogs[i];
      const previousLog = filteredLogs[i - 1];

      if (currentLog.fuelTypeId !== previousLog.fuelTypeId) {
        const fromType = fuelTypes.find(ft => ft.id === previousLog.fuelTypeId)?.name || 'Unknown';
        const toType = fuelTypes.find(ft => ft.id === currentLog.fuelTypeId)?.name || 'Unknown';

        transitionData.push({
          date: currentLog.date.split('T')[0],
          fromType,
          toType,
        });
      }
    }

    return transitionData;
  }, [fuelLogsData?.data, fuelTypes, dateRange]);

  const isLoading = isLoadingLogs || isLoadingTypes;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Fuel Type Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartDateRangeControls
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onRangeChange={(startDate, endDate) => setDateRange({ startDate, endDate })}
            minDate={minDate}
            maxDate={maxDate}
          />

          {/* Consumption Comparison */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Consumption Comparison</h3>
            <BarChart
              data={Object.entries(metrics?.byFuelType || {}).map(([id, data]) => ({
                name: fuelTypes?.find(ft => ft.id === id)?.name || 'Unknown',
                consumption: data.averageConsumption,
                unit: data.unit,
              }))}
              bars={[
                {
                  dataKey: "consumption",
                  fill: "#2563eb",
                  name: "Consumption",
                }
              ]}
              xAxisDataKey="name"
              height={300}
              showGrid={true}
              showLegend={false}
              showTooltip={true}
            />
          </div>

          {/* Usage Statistics */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Usage Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {usageStats.map(stat => (
                <Card key={stat.fuelTypeId}>
                  <CardContent className="pt-6">
                    <h4 className="text-base font-medium mb-4">{stat.name}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Quantity:</span>
                        <span>{stat.totalQuantity.toFixed(1)} {stat.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Cost:</span>
                        <span>${stat.totalCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fill-ups:</span>
                        <span>{stat.fillUps}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg. Quantity:</span>
                        <span>{stat.averageQuantity} {stat.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg. Cost:</span>
                        <span>${stat.averageCost}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Transition Analysis */}
          {transitions.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Fuel Type Transitions</h3>
              <div className="rounded-lg border">
                <div className="p-4">
                  <div className="space-y-4">
                    {transitions.map((transition, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground min-w-[100px]">{transition.date}</span>
                        <span className="font-medium">{transition.fromType}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-medium">{transition.toType}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cost Comparison */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Cost Comparison</h3>
            <BarChart
              data={Object.entries(metrics?.byFuelType || {}).map(([id, data]) => ({
                name: fuelTypes?.find(ft => ft.id === id)?.name || 'Unknown',
                costPerKm: data.averageCostPerKm,
                costPerUnit: data.averageCostPerUnit,
                unit: data.unit,
              }))}
              bars={[
                {
                  dataKey: "costPerKm",
                  fill: "#dc2626",
                  name: "Cost per km",
                },
                {
                  dataKey: "costPerUnit",
                  fill: "#eab308",
                  name: "Cost per unit",
                }
              ]}
              xAxisDataKey="name"
              height={300}
              showGrid={true}
              showLegend={true}
              showTooltip={true}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 