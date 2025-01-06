'use client';

import { VehicleList } from "@/features/vehicle/components/VehicleList";
import { vehicleApi } from "@/features/vehicle/store/vehicleApi";
import { VehicleFilters } from "@/features/vehicle/types";
import { useState } from "react";

export default function VehiclesPage() {
  const [filters, setFilters] = useState<VehicleFilters>({});
  const { data: vehicles = [], isLoading } = vehicleApi.useGetVehiclesQuery(filters);

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
      />
    </div>
  );
} 