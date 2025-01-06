'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { LineChart } from "@/components/ui/chart/line-chart";
import { Vehicle } from "../../types";
import { useGetFuelLogsQuery } from "../../store/fuelLogApi";
import { useMemo, useState } from "react";
import { ChartDateRangeControls } from "./ChartDateRangeControls";

interface CostTrendsProps {
  vehicle: Vehicle;
}

interface CostDataPoint {
  date: string;
  pricePerUnit: number;
  costPerKm: number;
  totalCost: number;
}

export function CostTrends({ vehicle }: CostTrendsProps) {
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

  const costData = useMemo(() => {
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
            date: currentLog.date.split('T')[0], // Format as YYYY-MM-DD
            pricePerUnit: Number(currentLog.pricePerUnit.toFixed(2)),
            costPerKm: Number((costPerKm).toFixed(3)),
            totalCost: Number(currentLog.totalCost.toFixed(2)),
          });
        }
      }
    }

    return dataPoints;
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
        <CardTitle>Cost Trends</CardTitle>
      </CardHeader>
      <CardContent>
        {costData.length > 0 ? (
          <div className="space-y-6">
            <ChartDateRangeControls
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onRangeChange={(startDate, endDate) => setDateRange({ startDate, endDate })}
              minDate={minDate}
              maxDate={maxDate}
            />

            <div>
              <h4 className="mb-2 text-sm font-medium">Fuel Price ($/L)</h4>
              <LineChart
                data={costData}
                lines={[
                  {
                    dataKey: "pricePerUnit",
                    stroke: "#dc2626", // red-600
                    name: "Price per Liter",
                  }
                ]}
                xAxisDataKey="date"
                height={200}
                showGrid={true}
                showLegend={false}
                showTooltip={true}
              />
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium">Cost per Distance ($/km)</h4>
              <LineChart
                data={costData}
                lines={[
                  {
                    dataKey: "costPerKm",
                    stroke: "#ea580c", // orange-600
                    name: "Cost per Kilometer",
                  }
                ]}
                xAxisDataKey="date"
                height={200}
                showGrid={true}
                showLegend={false}
                showTooltip={true}
              />
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium">Fill-up Cost ($)</h4>
              <LineChart
                data={costData}
                lines={[
                  {
                    dataKey: "totalCost",
                    stroke: "#0284c7", // sky-600
                    name: "Total Cost",
                  }
                ]}
                xAxisDataKey="date"
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