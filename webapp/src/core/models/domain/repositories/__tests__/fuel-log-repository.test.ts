import { FuelLog } from '../../entities';
import { FuelLogRepository } from '../fuel-log-repository';

describe('FuelLogRepository', () => {
  let repository: FuelLogRepository;
  const mockFuelLog: FuelLog = {
    id: '123',
    vehicle_id: 'vehicle123',
    date: new Date().toISOString(),
    fuel_type: 'Gasoline',
    quantity: 45.5,
    price_per_unit: 1.5,
    total_cost: 68.25,
    odometer: 50000,
    gas_station_id: 'station123',
    notes: 'Regular fill-up',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  beforeEach(() => {
    repository = {
      getById: jest.fn(),
      getByVehicleId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      getVehicleStats: jest.fn(),
      getMonthlyStats: jest.fn(),
    };
  });

  describe('getById', () => {
    it('should return a fuel log when found', async () => {
      (repository.getById as jest.Mock).mockResolvedValue(mockFuelLog);
      const result = await repository.getById('123');
      expect(result).toEqual(mockFuelLog);
      expect(repository.getById).toHaveBeenCalledWith('123');
    });

    it('should return null when fuel log not found', async () => {
      (repository.getById as jest.Mock).mockResolvedValue(null);
      const result = await repository.getById('nonexistent');
      expect(result).toBeNull();
      expect(repository.getById).toHaveBeenCalledWith('nonexistent');
    });
  });

  describe('getByVehicleId', () => {
    it('should return an array of fuel logs', async () => {
      const fuelLogs = [mockFuelLog];
      (repository.getByVehicleId as jest.Mock).mockResolvedValue(fuelLogs);
      const result = await repository.getByVehicleId('vehicle123');
      expect(result).toEqual(fuelLogs);
      expect(repository.getByVehicleId).toHaveBeenCalledWith('vehicle123');
    });

    it('should return empty array when no fuel logs found', async () => {
      (repository.getByVehicleId as jest.Mock).mockResolvedValue([]);
      const result = await repository.getByVehicleId('nonexistent');
      expect(result).toEqual([]);
      expect(repository.getByVehicleId).toHaveBeenCalledWith('nonexistent');
    });
  });

  describe('create', () => {
    it('should create and return a new fuel log', async () => {
      const { id, created_at, updated_at, ...createData } = mockFuelLog;
      (repository.create as jest.Mock).mockResolvedValue(mockFuelLog);
      
      const result = await repository.create(createData);
      expect(result).toEqual(mockFuelLog);
      expect(repository.create).toHaveBeenCalledWith(createData);
    });
  });

  describe('update', () => {
    it('should update and return the fuel log', async () => {
      const updateData = { quantity: 50.0, price_per_unit: 1.6, total_cost: 80.0 };
      const updatedFuelLog = { ...mockFuelLog, ...updateData };
      (repository.update as jest.Mock).mockResolvedValue(updatedFuelLog);
      
      const result = await repository.update('123', updateData);
      expect(result).toEqual(updatedFuelLog);
      expect(repository.update).toHaveBeenCalledWith('123', updateData);
    });
  });

  describe('delete', () => {
    it('should delete the fuel log', async () => {
      (repository.delete as jest.Mock).mockResolvedValue(undefined);
      await repository.delete('123');
      expect(repository.delete).toHaveBeenCalledWith('123');
    });
  });

  describe('getVehicleStats', () => {
    it('should return vehicle statistics', async () => {
      const mockStats = {
        total_spent: 1000.50,
        total_fuel: 500.25,
        avg_price_per_unit: 2.0,
      };
      (repository.getVehicleStats as jest.Mock).mockResolvedValue(mockStats);
      
      const result = await repository.getVehicleStats('vehicle123');
      expect(result).toEqual(mockStats);
      expect(repository.getVehicleStats).toHaveBeenCalledWith('vehicle123');
    });
  });

  describe('getMonthlyStats', () => {
    it('should return monthly statistics', async () => {
      const mockMonthlyStats = [
        {
          month: '2023-01',
          total_spent: 300.50,
          total_fuel: 150.25,
          avg_price_per_unit: 2.0,
        },
        {
          month: '2023-02',
          total_spent: 280.75,
          total_fuel: 140.375,
          avg_price_per_unit: 2.0,
        },
      ];
      (repository.getMonthlyStats as jest.Mock).mockResolvedValue(mockMonthlyStats);
      
      const startDate = '2023-01-01';
      const endDate = '2023-02-28';
      const result = await repository.getMonthlyStats('vehicle123', startDate, endDate);
      expect(result).toEqual(mockMonthlyStats);
      expect(repository.getMonthlyStats).toHaveBeenCalledWith('vehicle123', startDate, endDate);
    });

    it('should return empty array when no stats available', async () => {
      (repository.getMonthlyStats as jest.Mock).mockResolvedValue([]);
      
      const startDate = '2023-01-01';
      const endDate = '2023-02-28';
      const result = await repository.getMonthlyStats('vehicle123', startDate, endDate);
      expect(result).toEqual([]);
      expect(repository.getMonthlyStats).toHaveBeenCalledWith('vehicle123', startDate, endDate);
    });
  });
}); 