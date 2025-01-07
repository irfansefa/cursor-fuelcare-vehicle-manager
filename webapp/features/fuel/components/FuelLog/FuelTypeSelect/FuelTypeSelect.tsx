import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";
import { useVehicleFuelTypes } from "@/features/fuel/hooks/useVehicleFuelTypes";
import type { FuelType } from "@/features/fuel/types/fuelType";

export interface FuelTypeSelectProps {
  vehicleId: string;
  value?: string;
  onChange: (value: string) => void;
  onUnitChange?: (unit: 'liters' | 'gallons') => void;
  error?: string;
}

export const FuelTypeSelect = React.forwardRef<HTMLButtonElement, FuelTypeSelectProps>(
  ({ vehicleId, value, onChange, onUnitChange, error }, ref) => {
    const { compatibleFuelTypes, isLoading, error: fetchError } = useVehicleFuelTypes(vehicleId);

    React.useEffect(() => {
      // If there's a selected value, find its unit and notify parent
      if (value && onUnitChange && compatibleFuelTypes.length > 0) {
        const selectedType = compatibleFuelTypes.find((type) => type.id === value);
        if (selectedType) {
          onUnitChange(selectedType.unit);
        }
      }
    }, [value, onUnitChange, compatibleFuelTypes]);

    const handleChange = (newValue: string) => {
      onChange(newValue);
      
      // Update unit when selection changes
      if (onUnitChange) {
        const selectedType = compatibleFuelTypes.find((type) => type.id === newValue);
        if (selectedType) {
          onUnitChange(selectedType.unit);
        }
      }
    };

    return (
      <Select
        value={value}
        onValueChange={handleChange}
        disabled={isLoading || compatibleFuelTypes.length === 0}
      >
        <SelectTrigger
          ref={ref}
          className={error || fetchError ? "border-red-500" : ""}
          aria-invalid={!!error || !!fetchError}
        >
          <SelectValue 
            placeholder={
              fetchError 
                ? "Error loading fuel types" 
                : compatibleFuelTypes.length === 0 
                ? "No compatible fuel types" 
                : "Select fuel type"
            } 
          />
        </SelectTrigger>
        <SelectContent>
          {compatibleFuelTypes.map((fuelType) => (
            <SelectItem key={fuelType.id} value={fuelType.id}>
              {fuelType.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

FuelTypeSelect.displayName = "FuelTypeSelect"; 