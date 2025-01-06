'use client';

import { VehicleDetailsLayout } from "@/features/vehicle/components/VehicleDetails/VehicleDetailsLayout";
import { vehicleApi } from "@/features/vehicle/store/vehicleApi";
import { notFound } from "next/navigation";

interface VehicleDetailsPageProps {
  params: {
    id: string;
  };
}

export default function VehicleDetailsPage({ params }: VehicleDetailsPageProps) {
  const { data: vehicle, isLoading, error } = vehicleApi.useGetVehicleQuery(params.id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (error || !vehicle) {
    notFound();
  }

  return <VehicleDetailsLayout vehicle={vehicle} />;
} 