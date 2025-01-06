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
  make: string;
  model: string;
  year?: number;
  licensePlate?: string;
  vin?: string;
  status: VehicleStatus;
  documents: string[];
  createdAt: string;
  updatedAt: string;
}

export interface VehicleFilters {
  search?: string;
  status?: VehicleStatus;
  make?: string;
  year?: number;
}

export interface NewVehicle extends Omit<Vehicle, 'id' | 'documents' | 'createdAt' | 'updatedAt'> {
  documents?: Omit<Document, 'id'>[];
}

export interface UpdateVehicle extends Partial<NewVehicle> {
  id: string;
}

export type FuelType = 'regular' | 'premium' | 'diesel' | 'electric';

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