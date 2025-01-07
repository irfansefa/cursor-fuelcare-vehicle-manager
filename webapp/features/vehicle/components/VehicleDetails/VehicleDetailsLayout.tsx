'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card/card";
import { Vehicle } from "../../types";
import { Badge } from "@/components/ui/utils/badge";
import { VehicleOverview } from "./VehicleOverview";
import { VehicleFuelLogs } from "./VehicleFuelLogs";
import { VehicleConsumption } from "./VehicleConsumption";

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
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fuel">Fuel Logs</TabsTrigger>
          <TabsTrigger value="consumption">Consumption</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <VehicleOverview vehicle={vehicle} />
        </TabsContent>

        <TabsContent value="fuel" className="space-y-4">
          <VehicleFuelLogs vehicle={vehicle} />
        </TabsContent>

        <TabsContent value="consumption" className="space-y-4">
          <VehicleConsumption vehicle={vehicle} />
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">Maintenance records coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 