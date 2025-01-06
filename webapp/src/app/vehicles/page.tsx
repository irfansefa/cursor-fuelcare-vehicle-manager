'use client';

import { VehicleList } from "@/features/vehicle/components/VehicleList";
import { vehicleApi } from "@/features/vehicle/store/vehicleApi";
import { VehicleFilters, Vehicle } from "@/features/vehicle/types";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VehiclesPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<VehicleFilters>({});
  const { data: vehicles = [], isLoading } = vehicleApi.useGetVehiclesQuery(filters);

  const handleVehicleSelect = (vehicle: Vehicle) => {
    router.push(`/vehicles/${vehicle.id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Vehicles</h1>
      <VehicleList
        vehicles={vehicles}
        filters={filters}
        onFilterChange={setFilters}
        onSelect={handleVehicleSelect}
      />
    </div>
  );
} 