import { SupabaseClient } from '@supabase/supabase-js';
import { Vehicle } from '../../../../domain/entities';
import { SupabaseVehicleRepository } from '../vehicle-repository';

jest.mock('@supabase/supabase-js');

describe('SupabaseVehicleRepository', () => {
  let client: jest.Mocked<SupabaseClient>;
  let repository: SupabaseVehicleRepository;
  
  const mockVehicle: Vehicle = {
    id: '123',
    user_id: 'user123',
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    license_plate: 'ABC123',
    vin: '1HGCM82633A123456',
    created_at: '2023-01-15',
    updated_at: '2023-01-15',
  };

  beforeEach(() => {
    client = {
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: mockVehicle, error: null }),
            order: jest.fn().mockResolvedValue({ data: [mockVehicle], error: null }),
          }),
          order: jest.fn().mockResolvedValue({ data: [mockVehicle], error: null }),
        }),
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: mockVehicle, error: null }),
          }),
        }),
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({ data: mockVehicle, error: null }),
            }),
          }),
        }),
        delete: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ error: null }),
        }),
      }),
    } as unknown as jest.Mocked<SupabaseClient>;

    repository = new SupabaseVehicleRepository(client);
  });

  describe('getById', () => {
    it('should return a vehicle when found', async () => {
      const result = await repository.getById('123');
      expect(result).toEqual(mockVehicle);
      expect(client.from).toHaveBeenCalledWith('vehicles');
    });

    it('should return null when vehicle not found', async () => {
      client.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: null }),
          }),
        }),
      });

      const result = await repository.getById('nonexistent');
      expect(result).toBeNull();
    });

    it('should throw error when Supabase returns an error', async () => {
      client.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: new Error('Database error') }),
          }),
        }),
      });

      await expect(repository.getById('123')).rejects.toThrow('Database error');
    });
  });

  describe('getByUserId', () => {
    it('should return vehicles when found', async () => {
      const result = await repository.getByUserId('user123');
      expect(result).toEqual([mockVehicle]);
      expect(client.from).toHaveBeenCalledWith('vehicles');
    });

    it('should return empty array when no vehicles found', async () => {
      client.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            order: jest.fn().mockResolvedValue({ data: [], error: null }),
          }),
        }),
      });

      const result = await repository.getByUserId('nonexistent');
      expect(result).toEqual([]);
    });

    it('should throw error when Supabase returns an error', async () => {
      client.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            order: jest.fn().mockResolvedValue({ data: null, error: new Error('Database error') }),
          }),
        }),
      });

      await expect(repository.getByUserId('user123')).rejects.toThrow('Database error');
    });
  });

  describe('create', () => {
    it('should create and return a new vehicle', async () => {
      const { id, created_at, updated_at, ...createData } = mockVehicle;
      const result = await repository.create(createData);
      expect(result).toEqual(mockVehicle);
      expect(client.from).toHaveBeenCalledWith('vehicles');
    });

    it('should throw error when creation fails', async () => {
      client.from = jest.fn().mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: new Error('Failed to create vehicle') }),
          }),
        }),
      });

      const { id, created_at, updated_at, ...createData } = mockVehicle;
      await expect(repository.create(createData)).rejects.toThrow('Failed to create vehicle');
    });

    it('should throw error when data is null', async () => {
      client.from = jest.fn().mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: null }),
          }),
        }),
      });

      const { id, created_at, updated_at, ...createData } = mockVehicle;
      await expect(repository.create(createData)).rejects.toThrow('Failed to create vehicle');
    });
  });

  describe('update', () => {
    it('should update and return the vehicle', async () => {
      const updateData = { make: 'Honda', model: 'Civic' };
      const updatedVehicle = { ...mockVehicle, ...updateData };

      client.from = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({ data: updatedVehicle, error: null }),
            }),
          }),
        }),
      });

      const result = await repository.update('123', updateData);
      expect(result).toEqual(updatedVehicle);
      expect(client.from).toHaveBeenCalledWith('vehicles');
    });

    it('should throw error when update fails', async () => {
      client.from = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({ data: null, error: new Error('Failed to update vehicle') }),
            }),
          }),
        }),
      });

      await expect(repository.update('123', { make: 'Honda' }))
        .rejects.toThrow('Failed to update vehicle');
    });

    it('should throw error when data is null', async () => {
      client.from = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({ data: null, error: null }),
            }),
          }),
        }),
      });

      await expect(repository.update('123', { make: 'Honda' }))
        .rejects.toThrow('Failed to update vehicle');
    });
  });

  describe('delete', () => {
    it('should delete the vehicle successfully', async () => {
      await repository.delete('123');
      expect(client.from).toHaveBeenCalledWith('vehicles');
    });

    it('should throw error when Supabase returns an error', async () => {
      client.from = jest.fn().mockReturnValue({
        delete: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ error: new Error('Database error') }),
        }),
      });

      await expect(repository.delete('123')).rejects.toThrow('Database error');
    });
  });
}); 