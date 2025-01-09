'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { LineChart } from "@/components/ui/chart/line-chart";
import { Vehicle } from "../../types";
import type { FuelLog } from "../../store/fuelLogApi";
import { useMemo } from "react";
import { ChartDateRangeControls } from "./ChartDateRangeControls";

interface CostTrendsProps {
  vehicle: Vehicle;
  fuelLogs: FuelLog[];
  dateRange: {
    startDate: string;
    endDate: string;
  };
  onDateRangeChange: (startDate: string, endDate: string) => void;
  minDate: string | undefined;
  maxDate: string | undefined;
  isLoading: boolean;
}

interface CostDataPoint {
  x: string;
  pricePerUnit: number;
  costPerKm: number;
  totalCost: number;
}

export function CostTrends({ 
  vehicle,
  fuelLogs,
  dateRange,
  onDateRangeChange,
  minDate,
  maxDate,
  isLoading
}: CostTrendsProps) {
  const costData = useMemo(() => {
    if (!fuelLogs) return [];

    const sortedLogs = [...fuelLogs].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const dataPoints: CostDataPoint[] = [];

    // Calculate cost metrics for each fill-up
    for (let i = 1; i < sortedLogs.length; i++) {
      const currentLog = sortedLogs[i];
      const previousLog = sortedLogs[i - 1];
      
      if (currentLog.odometer && previousLog.odometer) {
        const distance = currentLog.odometer - previousLog.odometer;
        if (distance > 0) {
          const costPerKm = currentLog.totalCost / distance;

          dataPoints.push({
            x: currentLog.date.split('T')[0], // Format as YYYY-MM-DD
            pricePerUnit: Number(currentLog.pricePerUnit.toFixed(2)),
            costPerKm: Number((costPerKm).toFixed(3)),
            totalCost: Number(currentLog.totalCost.toFixed(2)),
          });
        }
      }
    }

    return dataPoints;
  }, [fuelLogs]);

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
        <CardTitle>Cost Trends</CardTitle>
      </CardHeader>
      <CardContent>
        {costData.length > 0 ? (
          <div className="space-y-6">
            <ChartDateRangeControls
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onRangeChange={onDateRangeChange}
              minDate={minDate}
              maxDate={maxDate}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Fuel Price ($/L)</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={costData}
                    xAxisDataKey="x"
                    lines={[
                      {
                        dataKey: "pricePerUnit",
                        stroke: "#dc2626", // red-600
                        name: "Price per Liter",
                      }
                    ]}
                    height={200}
                    formatTooltip={(value) => value.toFixed(2)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Cost per Distance ($/km)</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={costData}
                    xAxisDataKey="x"
                    lines={[
                      {
                        dataKey: "costPerKm",
                        stroke: "#2563eb", // blue-600
                        name: "Cost per km",
                      }
                    ]}
                    height={200}
                    formatTooltip={(value) => `$${value.toFixed(2)}/km`}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Fill-up Cost ($)</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={costData}
                    xAxisDataKey="x"
                    lines={[
                      {
                        dataKey: "totalCost",
                        stroke: "#0284c7", // sky-600
                        name: "Total Cost",
                      }
                    ]}
                    height={200}
                    formatTooltip={(value) => value.toFixed(2)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Cost per Unit</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={costData}
                    xAxisDataKey="x"
                    lines={[
                      {
                        dataKey: "costPerUnit",
                        stroke: "#dc2626", // red-600
                        name: "Cost per unit",
                      }
                    ]}
                    height={200}
                    formatTooltip={(value) => `$${value.toFixed(2)}/unit`}
                  />
                </CardContent>
              </Card>
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