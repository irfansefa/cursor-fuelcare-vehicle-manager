import { FuelLog } from '../entities';

export interface FuelLogRepository {
  getById(id: string): Promise<FuelLog | null>;
  getByVehicleId(vehicleId: string): Promise<FuelLog[]>;
  create(fuelLog: Omit<FuelLog, 'id' | 'created_at' | 'updated_at'>): Promise<FuelLog>;
  update(id: string, fuelLog: Partial<Omit<FuelLog, 'id' | 'created_at' | 'updated_at'>>): Promise<FuelLog>;
  delete(id: string): Promise<void>;
  getVehicleStats(vehicleId: string): Promise<{
    total_spent: number;
    total_fuel: number;
    avg_price_per_unit: number;
  }>;
  getMonthlyStats(vehicleId: string, startDate: string, endDate: string): Promise<{
    month: string;
    total_spent: number;
    total_fuel: number;
    avg_price_per_unit: number;
  }[]>;
} 