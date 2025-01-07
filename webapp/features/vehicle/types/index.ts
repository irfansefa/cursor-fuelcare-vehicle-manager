export type VehicleStatus = 'active' | 'maintenance' | 'inactive';

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  expiryDate?: string;
}

export interface Vehicle {
  id: string;
  user_id: string;
  make: string;
  model: string;
  year?: number;
  license_plate?: string;
  vin?: string;
  status: VehicleStatus;
  compatible_fuel_types: string[];
  preferred_fuel_type?: string;
  created_at: string;
  updated_at: string;
}

export interface VehicleFilters {
  search?: string;
  status?: VehicleStatus;
  make?: string;
  year?: number;
  fuelType?: FuelType;
}

export type NewVehicle = Omit<Vehicle, 'id' | 'user_id' | 'created_at' | 'updated_at'>;

export interface UpdateVehicle extends Partial<NewVehicle> {
  id: string;
}

export interface FuelLog {
  id: string;
  vehicleId: string;
  date: string;
  fuelType: FuelType;
  quantity: number;
  pricePerUnit: number;
  totalCost: number;
  odometer: number;
  gasStationId?: string;
  location?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewFuelLog extends Omit<FuelLog, 'id' | 'createdAt' | 'updatedAt'> {} 