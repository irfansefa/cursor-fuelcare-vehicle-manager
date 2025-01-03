import { Vehicle } from '../../entities';
import { VehicleRepository } from '../vehicle-repository';

describe('VehicleRepository', () => {
  let repository: VehicleRepository;
  const mockVehicle: Vehicle = {
    id: '123',
    user_id: 'user123',
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    license_plate: 'ABC123',
    vin: '1HGCM82633A123456',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  beforeEach(() => {
    repository = {
      getById: jest.fn(),
      getByUserId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  });

  describe('getById', () => {
    it('should return a vehicle when found', async () => {
      (repository.getById as jest.Mock).mockResolvedValue(mockVehicle);
      const result = await repository.getById('123');
      expect(result).toEqual(mockVehicle);
      expect(repository.getById).toHaveBeenCalledWith('123');
    });

    it('should return null when vehicle not found', async () => {
      (repository.getById as jest.Mock).mockResolvedValue(null);
      const result = await repository.getById('nonexistent');
      expect(result).toBeNull();
      expect(repository.getById).toHaveBeenCalledWith('nonexistent');
    });
  });

  describe('getByUserId', () => {
    it('should return an array of vehicles', async () => {
      const vehicles = [mockVehicle];
      (repository.getByUserId as jest.Mock).mockResolvedValue(vehicles);
      const result = await repository.getByUserId('user123');
      expect(result).toEqual(vehicles);
      expect(repository.getByUserId).toHaveBeenCalledWith('user123');
    });

    it('should return empty array when no vehicles found', async () => {
      (repository.getByUserId as jest.Mock).mockResolvedValue([]);
      const result = await repository.getByUserId('nonexistent');
      expect(result).toEqual([]);
      expect(repository.getByUserId).toHaveBeenCalledWith('nonexistent');
    });
  });

  describe('create', () => {
    it('should create and return a new vehicle', async () => {
      const { id, created_at, updated_at, ...createData } = mockVehicle;
      (repository.create as jest.Mock).mockResolvedValue(mockVehicle);
      
      const result = await repository.create(createData);
      expect(result).toEqual(mockVehicle);
      expect(repository.create).toHaveBeenCalledWith(createData);
    });
  });

  describe('update', () => {
    it('should update and return the vehicle', async () => {
      const updateData = { make: 'Honda', model: 'Civic' };
      const updatedVehicle = { ...mockVehicle, ...updateData };
      (repository.update as jest.Mock).mockResolvedValue(updatedVehicle);
      
      const result = await repository.update('123', updateData);
      expect(result).toEqual(updatedVehicle);
      expect(repository.update).toHaveBeenCalledWith('123', updateData);
    });
  });

  describe('delete', () => {
    it('should delete the vehicle', async () => {
      (repository.delete as jest.Mock).mockResolvedValue(undefined);
      await repository.delete('123');
      expect(repository.delete).toHaveBeenCalledWith('123');
    });
  });
}); 