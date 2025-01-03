import { Vehicle } from '../vehicle';

describe('Vehicle Entity', () => {
  const validVehicleData: Vehicle = {
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

  describe('Vehicle Creation', () => {
    it('should create a valid vehicle with all required properties', () => {
      const vehicle: Vehicle = { ...validVehicleData };
      expect(vehicle).toMatchObject(validVehicleData);
    });

    it('should have all required properties', () => {
      const vehicle: Vehicle = { ...validVehicleData };
      const requiredProperties = [
        'id',
        'user_id',
        'make',
        'model',
        'year',
        'license_plate',
        'vin',
        'created_at',
        'updated_at',
      ];

      requiredProperties.forEach(prop => {
        expect(vehicle).toHaveProperty(prop);
      });
    });
  });

  describe('Vehicle Properties', () => {
    it('should have a valid year format', () => {
      const vehicle: Vehicle = { ...validVehicleData };
      expect(typeof vehicle.year).toBe('number');
      expect(vehicle.year).toBeGreaterThan(1900);
      expect(vehicle.year).toBeLessThanOrEqual(new Date().getFullYear() + 1);
    });

    it('should have a valid VIN format', () => {
      const vehicle: Vehicle = { ...validVehicleData };
      expect(vehicle.vin).toMatch(/^[A-HJ-NPR-Z0-9]{17}$/);
    });

    it('should have valid timestamp formats', () => {
      const vehicle: Vehicle = { ...validVehicleData };
      expect(() => new Date(vehicle.created_at)).not.toThrow();
      expect(() => new Date(vehicle.updated_at)).not.toThrow();
    });

    it('should have a non-empty make', () => {
      const vehicle: Vehicle = { ...validVehicleData };
      expect(vehicle.make).toBeTruthy();
      expect(vehicle.make.length).toBeGreaterThan(0);
      expect(typeof vehicle.make).toBe('string');
    });

    it('should have a non-empty model', () => {
      const vehicle: Vehicle = { ...validVehicleData };
      expect(vehicle.model).toBeTruthy();
      expect(vehicle.model.length).toBeGreaterThan(0);
      expect(typeof vehicle.model).toBe('string');
    });

    it('should have a valid license plate format', () => {
      const vehicle: Vehicle = { ...validVehicleData };
      expect(vehicle.license_plate).toBeTruthy();
      expect(vehicle.license_plate.length).toBeGreaterThan(0);
      expect(typeof vehicle.license_plate).toBe('string');
      // License plate should only contain alphanumeric characters and hyphens
      expect(vehicle.license_plate).toMatch(/^[A-Z0-9-]+$/i);
    });
  });

  describe('Type Checking', () => {
    it('should have correct types for all properties', () => {
      const vehicle: Vehicle = { ...validVehicleData };
      
      expect(typeof vehicle.id).toBe('string');
      expect(typeof vehicle.user_id).toBe('string');
      expect(typeof vehicle.make).toBe('string');
      expect(typeof vehicle.model).toBe('string');
      expect(typeof vehicle.year).toBe('number');
      expect(typeof vehicle.license_plate).toBe('string');
      expect(typeof vehicle.vin).toBe('string');
      expect(typeof vehicle.created_at).toBe('string');
      expect(typeof vehicle.updated_at).toBe('string');
    });

    it('should maintain type safety with optional properties', () => {
      type VehicleKey = keyof Vehicle;
      const vehicle: Vehicle = { ...validVehicleData };
      
      const propertyTypes: Record<VehicleKey, string> = {
        id: 'string',
        user_id: 'string',
        make: 'string',
        model: 'string',
        year: 'number',
        license_plate: 'string',
        vin: 'string',
        created_at: 'string',
        updated_at: 'string'
      };

      Object.entries(propertyTypes).forEach(([key, expectedType]) => {
        const value = vehicle[key as VehicleKey];
        if (expectedType === 'number') {
          expect(typeof value).toBe('number');
        } else {
          expect(typeof value).toBe('string');
        }
      });
    });
  });
}); 