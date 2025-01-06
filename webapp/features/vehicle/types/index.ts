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
  documents: Document[];
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