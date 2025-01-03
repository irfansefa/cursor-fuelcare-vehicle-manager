import { SupabaseClient } from '@supabase/supabase-js';
import { ProfileRepository } from '../../../domain/repositories';
import { Profile } from '../../../domain/entities';

export class SupabaseProfileRepository implements ProfileRepository {
  constructor(private client: SupabaseClient) {}

  async getById(id: string): Promise<Profile | null> {
    const { data, error } = await this.client
      .from('profiles')
      .select()
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async getByUsername(username: string): Promise<Profile | null> {
    const { data, error } = await this.client
      .from('profiles')
      .select()
      .eq('username', username)
      .single();

    if (error) throw error;
    return data;
  }

  async create(userId: string, profile: Omit<Profile, 'id' | 'created_at' | 'updated_at'>): Promise<Profile> {
    const { data, error } = await this.client
      .from('profiles')
      .insert({ ...profile, id: userId })
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create profile');
    return data;
  }

  async update(id: string, profile: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>): Promise<Profile> {
    const { data, error } = await this.client
      .from('profiles')
      .update(profile)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to update profile');
    return data;
  }
} 