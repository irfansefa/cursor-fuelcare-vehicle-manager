import { Profile } from '../entities';

export interface ProfileRepository {
  getById(id: string): Promise<Profile | null>;
  getByUsername(username: string): Promise<Profile | null>;
  create(userId: string, profile: Omit<Profile, 'id' | 'created_at' | 'updated_at'>): Promise<Profile>;
  update(id: string, profile: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>): Promise<Profile>;
} 