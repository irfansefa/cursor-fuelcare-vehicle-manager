import { SupabaseClient } from '@supabase/supabase-js';
import { FuelLogRepository } from '../../../domain/repositories';
import { FuelLog } from '../../../domain/entities';

export class SupabaseFuelLogRepository implements FuelLogRepository {
  constructor(private client: SupabaseClient) {}

  async getById(id: string): Promise<FuelLog | null> {
    const { data, error } = await this.client
      .from('fuel_logs')
      .select()
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async getByVehicleId(vehicleId: string): Promise<FuelLog[]> {
    const { data, error } = await this.client
      .from('fuel_logs')
      .select()
      .eq('vehicle_id', vehicleId)
      .order('date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async create(fuelLog: Omit<FuelLog, 'id' | 'created_at' | 'updated_at'>): Promise<FuelLog> {
    const { data, error } = await this.client
      .from('fuel_logs')
      .insert(fuelLog)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create fuel log');
    return data;
  }

  async update(id: string, fuelLog: Partial<Omit<FuelLog, 'id' | 'created_at' | 'updated_at'>>): Promise<FuelLog> {
    const { data, error } = await this.client
      .from('fuel_logs')
      .update(fuelLog)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to update fuel log');
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.client
      .from('fuel_logs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async getVehicleStats(vehicleId: string): Promise<{
    total_spent: number;
    total_fuel: number;
    avg_price_per_unit: number;
  }> {
    const { data, error } = await this.client
      .from('fuel_logs')
      .select('total_cost, quantity')
      .eq('vehicle_id', vehicleId);

    if (error) throw error;
    if (!data || data.length === 0) {
      return {
        total_spent: 0,
        total_fuel: 0,
        avg_price_per_unit: 0,
      };
    }

    const total_spent = data.reduce((sum, log) => sum + log.total_cost, 0);
    const total_fuel = data.reduce((sum, log) => sum + log.quantity, 0);
    const avg_price_per_unit = total_spent / total_fuel;

    return {
      total_spent,
      total_fuel,
      avg_price_per_unit,
    };
  }

  async getMonthlyStats(vehicleId: string, startDate: string, endDate: string): Promise<{
    month: string;
    total_spent: number;
    total_fuel: number;
    avg_price_per_unit: number;
  }[]> {
    const { data, error } = await this.client
      .from('fuel_logs')
      .select('date, total_cost, quantity')
      .eq('vehicle_id', vehicleId)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) return [];

    const monthlyStats = new Map<string, {
      total_spent: number;
      total_fuel: number;
    }>();

    data.forEach(log => {
      const month = new Date(log.date).toISOString().slice(0, 7);
      const stats = monthlyStats.get(month) || { total_spent: 0, total_fuel: 0 };
      monthlyStats.set(month, {
        total_spent: stats.total_spent + log.total_cost,
        total_fuel: stats.total_fuel + log.quantity,
      });
    });

    return Array.from(monthlyStats.entries()).map(([month, stats]) => ({
      month,
      total_spent: stats.total_spent,
      total_fuel: stats.total_fuel,
      avg_price_per_unit: stats.total_spent / stats.total_fuel,
    }));
  }
} 