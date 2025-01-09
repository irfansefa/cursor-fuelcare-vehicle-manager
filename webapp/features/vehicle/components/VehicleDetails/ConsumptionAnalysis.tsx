'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { LineChart } from "@/components/ui/chart/line-chart";
import { BarChart } from "@/components/ui/chart/bar-chart";
import { Vehicle } from "../../types";
import type { FuelLog } from "../../store/fuelLogApi";
import { useMemo, useState } from "react";
import { ChartDateRangeControls } from "./ChartDateRangeControls";
import { Button } from "@/components/ui/button/button";
import { BarChartIcon, LineChartIcon } from "lucide-react";

interface ConsumptionAnalysisProps {
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

interface ConsumptionDataPoint {
  x: string;
  consumption: number;
  distance: number;
  quantity: number;
}

type ChartType = 'line' | 'bar';

export function ConsumptionAnalysis({ 
  vehicle,
  fuelLogs,
  dateRange,
  onDateRangeChange,
  minDate,
  maxDate,
  isLoading
}: ConsumptionAnalysisProps) {
  const [chartType, setChartType] = useState<ChartType>('line');

  const consumptionData = useMemo(() => {
    if (!fuelLogs) return [];

    const sortedLogs = [...fuelLogs].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const dataPoints: ConsumptionDataPoint[] = [];

    // Calculate consumption metrics for each fill-up
    for (let i = 1; i < sortedLogs.length; i++) {
      const currentLog = sortedLogs[i];
      const previousLog = sortedLogs[i - 1];
      
      if (currentLog.odometer && previousLog.odometer) {
        const distance = currentLog.odometer - previousLog.odometer;
        if (distance > 0) {
          const consumption = (currentLog.quantity / distance) * 100; // L/100km

          dataPoints.push({
            x: currentLog.date.split('T')[0], // Format as YYYY-MM-DD
            consumption: Number(consumption.toFixed(2)),
            distance: Number(distance.toFixed(1)),
            quantity: Number(currentLog.quantity.toFixed(1)),
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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Consumption Analysis</CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant={chartType === 'line' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setChartType('line')}
            title="Line Chart"
          >
            <LineChartIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={chartType === 'bar' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setChartType('bar')}
            title="Bar Chart"
          >
            <BarChartIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {consumptionData.length > 0 ? (
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
                  <CardTitle className="text-base">Consumption (L/100km)</CardTitle>
                </CardHeader>
                <CardContent>
                  {chartType === 'line' ? (
                    <LineChart
                      data={consumptionData}
                      xAxisDataKey="x"
                      lines={[
                        {
                          dataKey: "consumption",
                          stroke: "#2563eb", // blue-600
                          name: "Consumption",
                        }
                      ]}
                      height={200}
                      formatTooltip={(value) => `${value} L/100km`}
                    />
                  ) : (
                    <BarChart
                      data={consumptionData}
                      bars={[
                        {
                          dataKey: "consumption",
                          color: "#2563eb", // blue-600
                          name: "Consumption",
                        }
                      ]}
                      xAxisDataKey="x"
                      height={200}
                      showGrid={true}
                      showLegend={false}
                      showTooltip={true}
                    />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Distance (km)</CardTitle>
                </CardHeader>
                <CardContent>
                  {chartType === 'line' ? (
                    <LineChart
                      data={consumptionData}
                      xAxisDataKey="x"
                      lines={[
                        {
                          dataKey: "distance",
                          stroke: "#16a34a", // green-600
                          name: "Distance",
                        }
                      ]}
                      height={200}
                      formatTooltip={(value) => `${value} km`}
                    />
                  ) : (
                    <BarChart
                      data={consumptionData}
                      bars={[
                        {
                          dataKey: "distance",
                          color: "#16a34a", // green-600
                          name: "Distance",
                        }
                      ]}
                      xAxisDataKey="x"
                      height={200}
                      showGrid={true}
                      showLegend={false}
                      showTooltip={true}
                    />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Fuel Quantity (L)</CardTitle>
                </CardHeader>
                <CardContent>
                  {chartType === 'line' ? (
                    <LineChart
                      data={consumptionData}
                      xAxisDataKey="x"
                      lines={[
                        {
                          dataKey: "quantity",
                          stroke: "#dc2626", // red-600
                          name: "Quantity",
                        }
                      ]}
                      height={200}
                      formatTooltip={(value) => `${value} L`}
                    />
                  ) : (
                    <BarChart
                      data={consumptionData}
                      bars={[
                        {
                          dataKey: "quantity",
                          color: "#dc2626", // red-600
                          name: "Quantity",
                        }
                      ]}
                      xAxisDataKey="x"
                      height={200}
                      showGrid={true}
                      showLegend={false}
                      showTooltip={true}
                    />
                  )}
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