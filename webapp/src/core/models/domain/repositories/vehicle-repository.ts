import { Vehicle } from '../entities';

export interface VehicleRepository {
  getById(id: string): Promise<Vehicle | null>;
  getByUserId(userId: string): Promise<Vehicle[]>;
  create(vehicle: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>): Promise<Vehicle>;
  update(id: string, vehicle: Partial<Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>>): Promise<Vehicle>;
  delete(id: string): Promise<void>;
} 