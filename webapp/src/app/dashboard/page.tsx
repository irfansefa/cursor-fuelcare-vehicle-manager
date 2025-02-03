'use client';

import { useAuth } from "@/features/auth/hooks/useAuth";
import { PageLayout } from "@/components/layout/page-layout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { vehicleApi } from "@/features/vehicle/store/vehicleApi";
import { VehicleDetailsLayout } from "@/features/vehicle/components/VehicleDetails/VehicleDetailsLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/form/select";
import { Vehicle } from "@/features/vehicle/types";

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const { data: vehicles = [], isLoading: isLoadingVehicles } = vehicleApi.useGetVehiclesQuery({});
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(() => {
    // Try to get the last selected vehicle from localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedVehicleId');
    }
    return null;
  });

  // Get the selected vehicle's details
  const { data: selectedVehicle, isLoading: isLoadingVehicle } = vehicleApi.useGetVehicleQuery(
    selectedVehicleId ?? '', 
    { skip: !selectedVehicleId }
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Set initial vehicle when vehicles are loaded
  useEffect(() => {
    if (!selectedVehicleId && vehicles.length > 0) {
      // Just select the first vehicle for now
      // The actual last fuel log vehicle selection will be implemented in the API
      setSelectedVehicleId(vehicles[0].id);
      localStorage.setItem('selectedVehicleId', vehicles[0].id);
    }
  }, [vehicles, selectedVehicleId]);

  // Update localStorage when selection changes
  const handleVehicleChange = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    localStorage.setItem('selectedVehicleId', vehicleId);
  };

  if (!isAuthenticated) {
    return null;
  }

  const isLoading = isLoadingVehicles || isLoadingVehicle;

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.fullName}
            </p>
          </div>
          {vehicles.length > 0 && (
            <Select value={selectedVehicleId || undefined} onValueChange={handleVehicleChange}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select a vehicle" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle: Vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.make} {vehicle.model} ({vehicle.year})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {selectedVehicle && <VehicleDetailsLayout vehicle={selectedVehicle} />}
      </div>
    </PageLayout>
  );
} 