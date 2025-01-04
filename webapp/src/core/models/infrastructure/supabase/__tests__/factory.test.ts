import { SupabaseClient } from '@supabase/supabase-js';
import { repositoryFactory } from '../factory';
import { SupabaseProfileRepository, SupabaseVehicleRepository, SupabaseFuelLogRepository } from '../repositories';

jest.mock('@supabase/supabase-js');
jest.mock('@/core/config/supabase', () => ({
  supabase: {} as SupabaseClient,
}));

describe('RepositoryFactory', () => {
  describe('getInstance', () => {
    it('should return the same instance on multiple calls', () => {
      const instance1 = repositoryFactory;
      const instance2 = repositoryFactory;
      expect(instance1).toBe(instance2);
    });
  });

  describe('repository getters', () => {
    it('should return a SupabaseProfileRepository instance', () => {
      const repository = repositoryFactory.getProfileRepository();
      expect(repository).toBeInstanceOf(SupabaseProfileRepository);
    });

    it('should return the same SupabaseProfileRepository instance on multiple calls', () => {
      const repository1 = repositoryFactory.getProfileRepository();
      const repository2 = repositoryFactory.getProfileRepository();
      expect(repository1).toBe(repository2);
    });

    it('should return a SupabaseVehicleRepository instance', () => {
      const repository = repositoryFactory.getVehicleRepository();
      expect(repository).toBeInstanceOf(SupabaseVehicleRepository);
    });

    it('should return the same SupabaseVehicleRepository instance on multiple calls', () => {
      const repository1 = repositoryFactory.getVehicleRepository();
      const repository2 = repositoryFactory.getVehicleRepository();
      expect(repository1).toBe(repository2);
    });

    it('should return a SupabaseFuelLogRepository instance', () => {
      const repository = repositoryFactory.getFuelLogRepository();
      expect(repository).toBeInstanceOf(SupabaseFuelLogRepository);
    });

    it('should return the same SupabaseFuelLogRepository instance on multiple calls', () => {
      const repository1 = repositoryFactory.getFuelLogRepository();
      const repository2 = repositoryFactory.getFuelLogRepository();
      expect(repository1).toBe(repository2);
    });
  });

  describe('initialization', () => {
    it('should initialize repositories with Supabase client', () => {
      const profileRepository = repositoryFactory.getProfileRepository() as SupabaseProfileRepository;
      const vehicleRepository = repositoryFactory.getVehicleRepository() as SupabaseVehicleRepository;
      const fuelLogRepository = repositoryFactory.getFuelLogRepository() as SupabaseFuelLogRepository;

      // Check that each repository has a Supabase client
      expect(profileRepository['client']).toBeDefined();
      expect(vehicleRepository['client']).toBeDefined();
      expect(fuelLogRepository['client']).toBeDefined();
    });
  });
}); 