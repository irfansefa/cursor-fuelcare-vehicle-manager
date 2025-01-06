'use client';

import { VehicleList } from "@/features/vehicle/components/VehicleList";

export default function VehiclesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Vehicles</h1>
      <VehicleList />
    </div>
  );
} 