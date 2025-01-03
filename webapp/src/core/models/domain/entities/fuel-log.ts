export interface FuelLog {
  id: string;
  vehicle_id: string;
  date: string;
  fuel_type: string;
  quantity: number;
  price_per_unit: number;
  total_cost: number;
  odometer: number | null;
  gas_station_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
} 