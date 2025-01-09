import { useMemo } from 'react';
import { useGetFuelTypesQuery } from '@/features/fuel/store/fuelTypeApi';
import { Vehicle } from '../types';

interface UseVehicleFuelTypesResult {
  compatibleFuelTypes: string[];
  preferredFuelType: string | undefined;
  isLoading: boolean;
}

export function useVehicleFuelTypes(vehicle: Vehicle): UseVehicleFuelTypesResult {
  const { data: fuelTypes, isLoading } = useGetFuelTypesQuery({ status: 'active' });

  const result = useMemo(() => {
    if (!fuelTypes) {
      return {
        compatibleFuelTypes: [],
        preferredFuelType: undefined,
      };
    }

    const compatibleTypes = vehicle.compatible_fuel_types
      .map(id => fuelTypes.find(ft => ft.id === id)?.name)
      .filter((name): name is string => !!name);

    const preferredType = vehicle.preferred_fuel_type
      ? fuelTypes.find(ft => ft.id === vehicle.preferred_fuel_type)?.name
      : undefined;

    return {
      compatibleFuelTypes: compatibleTypes,
      preferredFuelType: preferredType,
    };
  }, [fuelTypes, vehicle.compatible_fuel_types, vehicle.preferred_fuel_type]);

  return {
    ...result,
    isLoading,
  };
} 