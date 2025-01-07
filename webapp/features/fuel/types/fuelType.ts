export type FuelUnit = 'liters' | 'gallons';

export type FuelTypeStatus = 'active' | 'inactive';

export interface FuelTypeProperties {
  octane?: number;
  type?: string;
  bio_content?: string;
  [key: string]: any;
}

export interface FuelType {
  id: string;
  name: string;
  description: string | null;
  unit: FuelUnit;
  properties: FuelTypeProperties;
  status: FuelTypeStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateFuelTypeDTO {
  name: string;
  description?: string;
  unit: FuelUnit;
  properties?: FuelTypeProperties;
  status?: FuelTypeStatus;
}

export interface UpdateFuelTypeDTO extends Partial<CreateFuelTypeDTO> {
  id: string;
}

export interface FuelTypeFilters {
  status?: FuelTypeStatus;
  search?: string;
} 