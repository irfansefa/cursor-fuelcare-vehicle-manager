'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Vehicle } from "../../types";
import { FiCalendar, FiClock, FiDroplet, FiTruck } from "react-icons/fi";
import { useVehicleFuelTypes } from '../../hooks/useVehicleFuelTypes';

interface VehicleOverviewProps {
  vehicle: Vehicle;
}

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary/10 rounded-full text-primary">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function VehicleOverview({ vehicle }: VehicleOverviewProps) {
  const { compatibleFuelTypes, preferredFuelType, isLoading: isLoadingFuelTypes } = useVehicleFuelTypes(vehicle);
  
  // These would come from the API in the real implementation
  const mockStats = {
    totalDistance: "15,234 km",
    fuelEfficiency: "7.2 L/100km",
    lastMaintenance: "2 months ago",
    nextService: "In 2,000 km",
  };

  return (
    <div className="space-y-6">
      {/* Vehicle Details */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <dt className="font-medium text-muted-foreground">Make</dt>
              <dd>{vehicle.make}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Model</dt>
              <dd>{vehicle.model}</dd>
            </div>
            {vehicle.year && (
              <div>
                <dt className="font-medium text-muted-foreground">Year</dt>
                <dd>{vehicle.year}</dd>
              </div>
            )}
            {vehicle.license_plate && (
              <div>
                <dt className="font-medium text-muted-foreground">License Plate</dt>
                <dd>{vehicle.license_plate}</dd>
              </div>
            )}
            {vehicle.vin && (
              <div>
                <dt className="font-medium text-muted-foreground">VIN</dt>
                <dd className="font-mono">{vehicle.vin}</dd>
              </div>
            )}
            <div>
              <dt className="font-medium text-muted-foreground">Compatible Fuel Types</dt>
              <dd>
                {isLoadingFuelTypes ? (
                  <span className="text-muted-foreground">Loading...</span>
                ) : compatibleFuelTypes.length > 0 ? (
                  compatibleFuelTypes.join(', ')
                ) : (
                  <span className="text-muted-foreground">No compatible fuel types specified</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Preferred Fuel Type</dt>
              <dd>
                {isLoadingFuelTypes ? (
                  <span className="text-muted-foreground">Loading...</span>
                ) : preferredFuelType ? (
                  preferredFuelType
                ) : (
                  <span className="text-muted-foreground">No preferred fuel type specified</span>
                )}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Distance"
          value={mockStats.totalDistance}
          icon={<FiTruck size={20} />}
        />
        <StatCard
          title="Fuel Efficiency"
          value={mockStats.fuelEfficiency}
          icon={<FiDroplet size={20} />}
        />
        <StatCard
          title="Last Maintenance"
          value={mockStats.lastMaintenance}
          icon={<FiClock size={20} />}
        />
        <StatCard
          title="Next Service"
          value={mockStats.nextService}
          icon={<FiCalendar size={20} />}
        />
      </div>
    </div>
  );
} 