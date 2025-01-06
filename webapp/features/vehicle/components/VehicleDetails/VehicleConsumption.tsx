'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Vehicle } from "../../types";
import { useGetFuelLogsQuery } from "../../store/fuelLogApi";
import { calculateConsumptionMetrics } from "../../utils/consumption";
import { ConsumptionTrends } from "./ConsumptionTrends";
import { MonthlyConsumption } from "./MonthlyConsumption";
import { CostTrends } from "./CostTrends";

interface VehicleConsumptionProps {
  vehicle: Vehicle;
}

export function VehicleConsumption({ vehicle }: VehicleConsumptionProps) {
  const { data: fuelLogsData, isLoading } = useGetFuelLogsQuery({
    vehicleId: vehicle.id,
    pageSize: 1000, // Get all logs for accurate calculations
  });

  const metrics = calculateConsumptionMetrics(fuelLogsData?.data || []);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Efficiency Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{metrics.averageConsumption}</div>
                    <div className="text-sm text-muted-foreground">L/100km</div>
                    <div className="text-sm font-medium mt-1">Avg. Consumption</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{metrics.totalDistance.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">km</div>
                    <div className="text-sm font-medium mt-1">Total Distance</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{metrics.totalFuel.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">L</div>
                    <div className="text-sm font-medium mt-1">Total Fuel</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">${metrics.averageCostPerKm}</div>
                    <div className="text-sm text-muted-foreground">per km</div>
                    <div className="text-sm font-medium mt-1">Avg. Cost/km</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">${metrics.averageCostPerLiter}</div>
                    <div className="text-sm text-muted-foreground">per L</div>
                    <div className="text-sm font-medium mt-1">Avg. Cost/L</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ConsumptionTrends vehicle={vehicle} />
        <MonthlyConsumption vehicle={vehicle} />
      </div>

      <CostTrends vehicle={vehicle} />
    </div>
  );
} 