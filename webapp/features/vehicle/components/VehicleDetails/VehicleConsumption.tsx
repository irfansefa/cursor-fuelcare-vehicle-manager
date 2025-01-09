'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Vehicle } from "../../types";
import { useGetFuelLogsQuery } from "../../store/fuelLogApi";
import { calculateConsumptionMetrics } from "../../utils/consumption";
import { CostTrends } from "./CostTrends";
import { FuelTypeAnalytics } from "./FuelTypeAnalytics";
import { ConsumptionAnalysis } from "./ConsumptionAnalysis";
import { useGetFuelTypesQuery } from "@/features/fuel/store/fuelTypeApi";
import { useMemo, useState, useEffect } from "react";

interface VehicleConsumptionProps {
  vehicle: Vehicle;
}

export function VehicleConsumption({ vehicle }: VehicleConsumptionProps) {
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
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>(() => ({
    startDate: '',
    endDate: '',
  }));

  // Update date range when min/max dates are available
  useEffect(() => {
    if (minDate && maxDate) {
      setDateRange({
        startDate: minDate,
        endDate: maxDate,
      });
    }
  }, [minDate, maxDate]);

  // Transform API FuelLog to internal FuelLog type
  const transformedLogs = useMemo(() => {
    if (!fuelLogsData?.data) return [];
    
    return fuelLogsData.data.map(log => {
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
  }, [fuelLogsData?.data]);

  const metrics = calculateConsumptionMetrics(transformedLogs);
  const isLoading = isLoadingLogs || isLoadingTypes;

  // Filter logs based on date range
  const filteredLogs = useMemo(() => {
    if (!fuelLogsData?.data || !dateRange.startDate || !dateRange.endDate) return [];

    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59); // Include the entire end date

    return fuelLogsData.data.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= startDate && logDate <= endDate;
    });
  }, [fuelLogsData?.data, dateRange.startDate, dateRange.endDate]);

  // Don't render children until we have all necessary data
  if (isLoading || !dateRange.startDate || !dateRange.endDate) {
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
          <CardTitle>Overall Efficiency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{metrics.overall.totalDistance.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">km</div>
                  <div className="text-sm font-medium mt-1">Total Distance</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">${metrics.overall.totalCost.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">total</div>
                  <div className="text-sm font-medium mt-1">Total Cost</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">${metrics.overall.averageCostPerKm}</div>
                  <div className="text-sm text-muted-foreground">per km</div>
                  <div className="text-sm font-medium mt-1">Avg. Cost/km</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Fuel Type Specific Metrics */}
      {Object.entries(metrics.byFuelType).map(([fuelTypeId, typeMetrics]) => {
        const fuelType = fuelTypes?.find(ft => ft.id === fuelTypeId);
        if (!fuelType) return null;

        return (
          <Card key={fuelTypeId}>
            <CardHeader>
              <CardTitle>{fuelType.name} Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{typeMetrics.averageConsumption}</div>
                      <div className="text-sm text-muted-foreground">
                        {typeMetrics.unit === 'liters' ? 'L/100km' : 'gal/100km'}
                      </div>
                      <div className="text-sm font-medium mt-1">Avg. Consumption</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{typeMetrics.totalDistance.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">km</div>
                      <div className="text-sm font-medium mt-1">Total Distance</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{typeMetrics.totalFuel.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">
                        {typeMetrics.unit === 'liters' ? 'L' : 'gal'}
                      </div>
                      <div className="text-sm font-medium mt-1">Total Fuel</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">${typeMetrics.averageCostPerKm}</div>
                      <div className="text-sm text-muted-foreground">per km</div>
                      <div className="text-sm font-medium mt-1">Avg. Cost/km</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">${typeMetrics.averageCostPerUnit}</div>
                      <div className="text-sm text-muted-foreground">
                        per {typeMetrics.unit === 'liters' ? 'L' : 'gal'}
                      </div>
                      <div className="text-sm font-medium mt-1">Avg. Cost/Unit</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        );
      })}

      <ConsumptionAnalysis 
        vehicle={vehicle}
        fuelLogs={filteredLogs}
        dateRange={dateRange}
        onDateRangeChange={(startDate, endDate) => setDateRange({ startDate, endDate })}
        minDate={minDate}
        maxDate={maxDate}
        isLoading={false}
      />

      <CostTrends 
        vehicle={vehicle}
        fuelLogs={filteredLogs}
        dateRange={dateRange}
        onDateRangeChange={(startDate, endDate) => setDateRange({ startDate, endDate })}
        minDate={minDate}
        maxDate={maxDate}
        isLoading={false}
      />
      <FuelTypeAnalytics 
        vehicle={vehicle}
        fuelLogs={filteredLogs}
        fuelTypes={fuelTypes}
        dateRange={dateRange}
        onDateRangeChange={(startDate, endDate) => setDateRange({ startDate, endDate })}
        minDate={minDate}
        maxDate={maxDate}
        isLoading={false}
      />
    </div>
  );
} 