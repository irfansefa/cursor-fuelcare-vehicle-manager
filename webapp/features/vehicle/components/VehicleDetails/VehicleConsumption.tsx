'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Vehicle } from "../../types";
import { useGetFuelLogsQuery } from "../../store/fuelLogApi";
import { calculateConsumptionMetrics } from "../../utils/consumption";
import { ConsumptionTrends } from "./ConsumptionTrends";
import { MonthlyConsumption } from "./MonthlyConsumption";
import { CostTrends } from "./CostTrends";
import { FuelTypeAnalytics } from "./FuelTypeAnalytics";
import { useGetFuelTypesQuery } from "@/features/fuel/store/fuelTypeApi";
import { useMemo } from "react";

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

  const { data: fuelTypes, isLoading: isLoadingTypes } = useGetFuelTypesQuery({
    status: 'active'
  });

  const metrics = calculateConsumptionMetrics(transformedLogs);
  const isLoading = isLoadingLogs || isLoadingTypes;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Overall Efficiency</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
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
          )}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ConsumptionTrends vehicle={vehicle} />
        <MonthlyConsumption vehicle={vehicle} />
      </div>

      <CostTrends vehicle={vehicle} />
      <FuelTypeAnalytics vehicle={vehicle} />
    </div>
  );
} 