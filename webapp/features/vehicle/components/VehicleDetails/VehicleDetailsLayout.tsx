'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card/card";
import { Vehicle } from "../../types";
import { Badge } from "@/components/ui/utils/badge";
import { VehicleOverview } from "./VehicleOverview";
import { VehicleFuelLogs } from "./VehicleFuelLogs";
import { VehicleConsumption } from "./VehicleConsumption";
import { VehicleExpenses } from "./VehicleExpenses";
import { VehicleExpenseAnalytics } from "@/features/expense/components/vehicle-expense-analytics/VehicleExpenseAnalytics";

interface VehicleDetailsLayoutProps {
  vehicle: Vehicle;
}

export function VehicleDetailsLayout({ vehicle }: VehicleDetailsLayoutProps) {
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{vehicle.make} {vehicle.model}</h2>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                {vehicle.year && <span>{vehicle.year}</span>}
                {vehicle.license_plate && <span>• {vehicle.license_plate}</span>}
              </div>
            </div>
            <Badge variant={vehicle.status === 'active' ? 'success' : vehicle.status === 'maintenance' ? 'warning' : 'error'}>
              {vehicle.status}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs Navigation */}
      <div className="-mx-4 sm:-mx-6 md:mx-0 px-4 sm:px-6 md:px-0">
        <Tabs defaultValue="overview" className="space-y-4">
          <div className="relative">
            <div className="overflow-x-auto scrollbar-none">
              <TabsList className="w-max min-w-full md:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="fuel">Fuel Logs</TabsTrigger>
                <TabsTrigger value="consumption">Consumption</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
              </TabsList>
            </div>
            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent md:hidden pointer-events-none" />
          </div>

          <TabsContent value="overview" className="space-y-4">
            <VehicleOverview vehicle={vehicle} />
          </TabsContent>

          <TabsContent value="fuel" className="space-y-4">
            <VehicleFuelLogs vehicle={vehicle} />
          </TabsContent>

          <TabsContent value="consumption" className="space-y-4">
            <VehicleConsumption vehicle={vehicle} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <VehicleExpenseAnalytics vehicleId={vehicle.id} />
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Maintenance records coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-4">
            <VehicleExpenses vehicle={vehicle} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 