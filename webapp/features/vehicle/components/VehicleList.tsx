import { useState } from "react";
import { VehicleCard } from "./VehicleCard";
import { useGetVehiclesQuery } from "../store/vehicleApi";
import { VehicleStatus } from "../types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/form/select";
import { CreateVehicleModal } from "./CreateVehicleModal";
import { Button } from "@/components/ui/button";

export function VehicleList() {
  const [statusFilter, setStatusFilter] = useState<VehicleStatus | 'all'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data: vehicles = [], isLoading } = useGetVehiclesQuery(
    statusFilter === 'all' ? {} : { status: statusFilter }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="w-[200px]">
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as VehicleStatus | 'all')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All vehicles</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Add Vehicle
        </Button>
        <CreateVehicleModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
        {vehicles.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No vehicles found. Add your first vehicle to get started.
          </div>
        )}
      </div>
    </div>
  );
} 