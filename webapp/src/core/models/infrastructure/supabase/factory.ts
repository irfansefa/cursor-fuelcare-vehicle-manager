import { SupabaseClient } from '@supabase/supabase-js';
import { ProfileRepository, VehicleRepository, FuelLogRepository } from '../../domain/repositories';
import { SupabaseProfileRepository, SupabaseVehicleRepository, SupabaseFuelLogRepository } from './repositories';
import { supabase } from '@/core/config/supabase';

class RepositoryFactory {
  private static instance: RepositoryFactory;
  private supabaseClient: SupabaseClient;

  private profileRepository: ProfileRepository;
  private vehicleRepository: VehicleRepository;
  private fuelLogRepository: FuelLogRepository;

  private constructor() {
    this.supabaseClient = supabase;
    this.profileRepository = new SupabaseProfileRepository(this.supabaseClient);
    this.vehicleRepository = new SupabaseVehicleRepository(this.supabaseClient);
    this.fuelLogRepository = new SupabaseFuelLogRepository(this.supabaseClient);
  }

  public static getInstance(): RepositoryFactory {
    if (!RepositoryFactory.instance) {
      RepositoryFactory.instance = new RepositoryFactory();
    }
    return RepositoryFactory.instance;
  }

  public getProfileRepository(): ProfileRepository {
    return this.profileRepository;
  }

  public getVehicleRepository(): VehicleRepository {
    return this.vehicleRepository;
  }

  public getFuelLogRepository(): FuelLogRepository {
    return this.fuelLogRepository;
  }
}

// Export a singleton instance
export const repositoryFactory = RepositoryFactory.getInstance(); 