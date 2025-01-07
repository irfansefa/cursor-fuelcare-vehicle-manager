import { useEffect, useState } from 'react';
import { FuelType } from '../types/fuelType';
import { useGetFuelTypesQuery } from '../store/fuelTypeApi';

interface UseVehicleFuelTypesResult {
  compatibleFuelTypes: FuelType[];
  isLoading: boolean;
  error: Error | null;
}

export function useVehicleFuelTypes(vehicleId: string): UseVehicleFuelTypesResult {
  const [compatibleFuelTypes, setCompatibleFuelTypes] = useState<FuelType[]>([]);
  const [error, setError] = useState<Error | null>(null);
  
  // Get all active fuel types
  const { data: allFuelTypes, isLoading: isLoadingFuelTypes } = useGetFuelTypesQuery({ 
    status: 'active' 
  });

  useEffect(() => {
    const fetchCompatibleTypes = async () => {
      try {
        // Fetch vehicle's compatible fuel types
        const response = await fetch(`/api/fleet-management/vehicles/details/${vehicleId}`);
        if (!response.ok) throw new Error('Failed to fetch vehicle');
        
        const vehicle = await response.json();
        
        // Filter fuel types based on vehicle's compatible types
        if (allFuelTypes && vehicle.compatible_fuel_types) {
          const compatible = allFuelTypes.filter(type => 
            vehicle.compatible_fuel_types.includes(type.id)
          );
          setCompatibleFuelTypes(compatible);
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch compatible fuel types'));
        setCompatibleFuelTypes([]);
      }
    };

    if (allFuelTypes) {
      fetchCompatibleTypes();
    }
  }, [vehicleId, allFuelTypes]);

  const isLoading = isLoadingFuelTypes || (!!allFuelTypes && compatibleFuelTypes.length === 0);

  return {
    compatibleFuelTypes,
    isLoading,
    error
  };
} 