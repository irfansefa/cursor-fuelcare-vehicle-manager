import { SupabaseClient } from '@supabase/supabase-js';
import { FuelLog } from '../../../../domain/entities';
import { SupabaseFuelLogRepository } from '../fuel-log-repository';

jest.mock('@supabase/supabase-js');

describe('SupabaseFuelLogRepository', () => {
  let client: jest.Mocked<SupabaseClient>;
  let repository: SupabaseFuelLogRepository;
  
  const mockFuelLog: FuelLog = {
    id: '123',
    vehicle_id: 'vehicle123',
    date: '2023-01-15',
    fuel_type: 'Gasoline',
    quantity: 45.5,
    price_per_unit: 1.5,
    total_cost: 68.25,
    odometer: 50000,
    gas_station_id: 'station123',
    notes: 'Regular fill-up',
    created_at: '2023-01-15',
    updated_at: '2023-01-15',
  };

  beforeEach(() => {
    client = {
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: mockFuelLog, error: null }),
            order: jest.fn().mockResolvedValue({ data: [mockFuelLog], error: null }),
            gte: jest.fn().mockReturnValue({
              lte: jest.fn().mockReturnValue({
                order: jest.fn().mockResolvedValue({ data: [mockFuelLog], error: null }),
              }),
            }),
          }),
          order: jest.fn().mockResolvedValue({ data: [mockFuelLog], error: null }),
        }),
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: mockFuelLog, error: null }),
          }),
        }),
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({ data: mockFuelLog, error: null }),
            }),
          }),
        }),
        delete: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ error: null }),
        }),
      }),
    } as unknown as jest.Mocked<SupabaseClient>;

    repository = new SupabaseFuelLogRepository(client);
  });

  describe('getById', () => {
    it('should return a fuel log when found', async () => {
      const result = await repository.getById('123');
      expect(result).toEqual(mockFuelLog);
      expect(client.from).toHaveBeenCalledWith('fuel_logs');
    });

    it('should return null when fuel log not found', async () => {
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
  });

  describe('getByVehicleId', () => {
    it('should return fuel logs when found', async () => {
      const result = await repository.getByVehicleId('vehicle123');
      expect(result).toEqual([mockFuelLog]);
      expect(client.from).toHaveBeenCalledWith('fuel_logs');
    });

    it('should return empty array when no logs found', async () => {
      client.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            order: jest.fn().mockResolvedValue({ data: [], error: null }),
          }),
        }),
      });

      const result = await repository.getByVehicleId('nonexistent');
      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create and return a new fuel log', async () => {
      const { id, created_at, updated_at, ...createData } = mockFuelLog;
      const result = await repository.create(createData);
      expect(result).toEqual(mockFuelLog);
      expect(client.from).toHaveBeenCalledWith('fuel_logs');
    });

    it('should throw error when creation fails', async () => {
      client.from = jest.fn().mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: new Error('Failed to create fuel log') }),
          }),
        }),
      });

      const { id, created_at, updated_at, ...createData } = mockFuelLog;
      await expect(repository.create(createData)).rejects.toThrow('Failed to create fuel log');
    });
  });

  describe('update', () => {
    it('should update and return the fuel log', async () => {
      const updateData = { quantity: 50.0, price_per_unit: 1.6, total_cost: 80.0 };
      const updatedFuelLog = { ...mockFuelLog, ...updateData };

      client.from = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({ data: updatedFuelLog, error: null }),
            }),
          }),
        }),
      });

      const result = await repository.update('123', updateData);
      expect(result).toEqual(updatedFuelLog);
      expect(client.from).toHaveBeenCalledWith('fuel_logs');
    });

    it('should throw error when update fails', async () => {
      client.from = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({ data: null, error: new Error('Failed to update fuel log') }),
            }),
          }),
        }),
      });

      await expect(repository.update('123', { quantity: 50.0 }))
        .rejects.toThrow('Failed to update fuel log');
    });
  });

  describe('delete', () => {
    it('should delete the fuel log successfully', async () => {
      await repository.delete('123');
      expect(client.from).toHaveBeenCalledWith('fuel_logs');
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

  describe('getVehicleStats', () => {
    it('should calculate and return vehicle statistics', async () => {
      const mockLogs = [
        { total_cost: 100, quantity: 50 },
        { total_cost: 200, quantity: 100 }
      ];

      client.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: mockLogs, error: null }),
        }),
      });

      const result = await repository.getVehicleStats('vehicle123');
      expect(result).toEqual({
        total_spent: 300,
        total_fuel: 150,
        avg_price_per_unit: 2
      });
    });

    it('should return zero values when no logs found', async () => {
      client.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: [], error: null }),
        }),
      });

      const result = await repository.getVehicleStats('vehicle123');
      expect(result).toEqual({
        total_spent: 0,
        total_fuel: 0,
        avg_price_per_unit: 0
      });
    });
  });

  describe('getMonthlyStats', () => {
    it('should calculate and return monthly statistics', async () => {
      const mockLogs = [
        { date: '2023-01-15', total_cost: 100, quantity: 50 },
        { date: '2023-01-20', total_cost: 100, quantity: 50 },
        { date: '2023-02-15', total_cost: 200, quantity: 100 }
      ];

      client.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            gte: jest.fn().mockReturnValue({
              lte: jest.fn().mockReturnValue({
                order: jest.fn().mockResolvedValue({ data: mockLogs, error: null }),
              }),
            }),
          }),
        }),
      });

      const result = await repository.getMonthlyStats(
        'vehicle123',
        '2023-01-01',
        '2023-02-28'
      );

      expect(result).toEqual([
        {
          month: '2023-01',
          total_spent: 200,
          total_fuel: 100,
          avg_price_per_unit: 2
        },
        {
          month: '2023-02',
          total_spent: 200,
          total_fuel: 100,
          avg_price_per_unit: 2
        }
      ]);
    });

    it('should return empty array when no logs found', async () => {
      client.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            gte: jest.fn().mockReturnValue({
              lte: jest.fn().mockReturnValue({
                order: jest.fn().mockResolvedValue({ data: [], error: null }),
              }),
            }),
          }),
        }),
      });

      const result = await repository.getMonthlyStats(
        'vehicle123',
        '2023-01-01',
        '2023-02-28'
      );

      expect(result).toEqual([]);
    });
  });
}); 