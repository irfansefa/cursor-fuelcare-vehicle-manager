import { SupabaseClient } from '@supabase/supabase-js';
import { VehicleRepository } from '../../../domain/repositories';
import { Vehicle } from '../../../domain/entities';

export class SupabaseVehicleRepository implements VehicleRepository {
  constructor(private client: SupabaseClient) {}

  async getById(id: string): Promise<Vehicle | null> {
    const { data, error } = await this.client
      .from('vehicles')
      .select()
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async getByUserId(userId: string): Promise<Vehicle[]> {
    const { data, error } = await this.client
      .from('vehicles')
      .select()
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async create(vehicle: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>): Promise<Vehicle> {
    const { data, error } = await this.client
      .from('vehicles')
      .insert(vehicle)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create vehicle');
    return data;
  }

  async update(id: string, vehicle: Partial<Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>>): Promise<Vehicle> {
    const { data, error } = await this.client
      .from('vehicles')
      .update(vehicle)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to update vehicle');
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.client
      .from('vehicles')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
} 