'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Vehicle } from "../../types";
import type { FuelLog } from "../../store/fuelLogApi";
import { useMemo } from "react";
import { ChartDateRangeControls } from "./ChartDateRangeControls";
import { BarChart } from "@/components/ui/chart/bar-chart";
import { calculateConsumptionMetrics } from "../../utils/consumption";
import type { FuelType } from "@/features/fuel/types/fuelType";

interface FuelTypeAnalyticsProps {
  vehicle: Vehicle;
  fuelLogs: FuelLog[];
  fuelTypes: FuelType[] | undefined;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  onDateRangeChange: (startDate: string, endDate: string) => void;
  minDate: string | undefined;
  maxDate: string | undefined;
  isLoading: boolean;
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

export function FuelTypeAnalytics({ 
  vehicle,
  fuelLogs,
  fuelTypes,
  dateRange,
  onDateRangeChange,
  minDate,
  maxDate,
  isLoading
}: FuelTypeAnalyticsProps) {
  // Calculate consumption metrics
  const metrics = useMemo(() => {
    if (!fuelLogs) return null;
    
    // Transform API FuelLog to internal FuelLog type
    const transformedLogs = fuelLogs.map(log => {
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
  }, [fuelLogs]);

  // Calculate usage statistics
  const usageStats = useMemo(() => {
    if (!fuelLogs || !fuelTypes || !vehicle.compatible_fuel_types?.length) return [];

    const stats = new Map<string, FuelTypeUsage>();

    // Initialize stats for each compatible fuel type
    vehicle.compatible_fuel_types.forEach((compatibleFuelTypeId: string) => {
      const fuelType = fuelTypes.find(ft => ft.id === compatibleFuelTypeId);
      if (!fuelType) return;

      stats.set(fuelType.id, {
        fuelTypeId: fuelType.id,
        name: fuelType.name,
        totalQuantity: 0,
        totalCost: 0,
        fillUps: 0,
        averageQuantity: 0,
        averageCost: 0,
        unit: fuelType.unit,
      });
    });

    // Calculate statistics
    fuelLogs.forEach(log => {
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
  }, [fuelLogs, fuelTypes, vehicle.compatible_fuel_types]);

  // Analyze fuel type transitions
  const transitions = useMemo(() => {
    if (!fuelLogs || !fuelTypes) return [];

    const transitionData: TransitionData[] = [];
    const sortedLogs = [...fuelLogs].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    for (let i = 1; i < sortedLogs.length; i++) {
      const currentLog = sortedLogs[i];
      const previousLog = sortedLogs[i - 1];

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
  }, [fuelLogs, fuelTypes]);

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
            onRangeChange={onDateRangeChange}
            minDate={minDate}
            maxDate={maxDate}
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Usage Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
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
              </CardContent>
            </Card>

            {/* Consumption Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Consumption Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={Object.entries(metrics?.byFuelType || {}).map(([id, data]) => ({
                    name: fuelTypes?.find(ft => ft.id === id)?.name || 'Unknown',
                    consumption: data.averageConsumption,
                    unit: data.unit,
                  }))}
                  bars={[
                    {
                      dataKey: "consumption",
                      color: "#2563eb",
                      name: "Consumption",
                    }
                  ]}
                  xAxisDataKey="name"
                  height={300}
                  showGrid={true}
                  showLegend={false}
                  showTooltip={true}
                />
              </CardContent>
            </Card>

            {/* Cost Comparison */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Cost Comparison</CardTitle>
              </CardHeader>
              <CardContent>
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
                      color: "#dc2626",
                      name: "Cost per km",
                    },
                    {
                      dataKey: "costPerUnit",
                      color: "#eab308",
                      name: "Cost per unit",
                    }
                  ]}
                  xAxisDataKey="name"
                  height={300}
                  showGrid={true}
                  showLegend={true}
                  showTooltip={true}
                />
              </CardContent>
            </Card>
          </div>

          {/* Transition Analysis */}
          {transitions.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Fuel Type Transitions</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 