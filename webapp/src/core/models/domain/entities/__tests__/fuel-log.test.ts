import { FuelLog } from '../fuel-log';

describe('FuelLog Entity', () => {
  const validFuelLogData: FuelLog = {
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

  describe('FuelLog Creation', () => {
    it('should create a valid fuel log with all required properties', () => {
      const fuelLog: FuelLog = { ...validFuelLogData };
      expect(fuelLog).toMatchObject(validFuelLogData);
    });

    it('should have all required properties', () => {
      const fuelLog: FuelLog = { ...validFuelLogData };
      const requiredProperties = [
        'id',
        'vehicle_id',
        'date',
        'fuel_type',
        'quantity',
        'price_per_unit',
        'total_cost',
        'created_at',
        'updated_at',
      ];

      requiredProperties.forEach(prop => {
        expect(fuelLog).toHaveProperty(prop);
      });
    });

    it('should allow null for optional properties', () => {
      const fuelLog: FuelLog = {
        ...validFuelLogData,
        odometer: null,
        gas_station_id: null,
        notes: null,
      };

      expect(fuelLog.odometer).toBeNull();
      expect(fuelLog.gas_station_id).toBeNull();
      expect(fuelLog.notes).toBeNull();
    });
  });

  describe('FuelLog Properties', () => {
    it('should have valid numeric values', () => {
      const fuelLog: FuelLog = { ...validFuelLogData };
      expect(typeof fuelLog.quantity).toBe('number');
      expect(typeof fuelLog.price_per_unit).toBe('number');
      expect(typeof fuelLog.total_cost).toBe('number');
      expect(fuelLog.quantity).toBeGreaterThan(0);
      expect(fuelLog.price_per_unit).toBeGreaterThan(0);
      expect(fuelLog.total_cost).toBeGreaterThan(0);
    });

    it('should have valid date format', () => {
      const fuelLog: FuelLog = { ...validFuelLogData };
      expect(() => new Date(fuelLog.date)).not.toThrow();
    });

    it('should have valid timestamp formats', () => {
      const fuelLog: FuelLog = { ...validFuelLogData };
      expect(() => new Date(fuelLog.created_at)).not.toThrow();
      expect(() => new Date(fuelLog.updated_at)).not.toThrow();
    });

    it('should have a valid odometer reading when provided', () => {
      const fuelLog: FuelLog = { ...validFuelLogData };
      if (fuelLog.odometer !== null) {
        expect(typeof fuelLog.odometer).toBe('number');
        expect(fuelLog.odometer).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('Type Checking', () => {
    it('should have correct types for all properties', () => {
      const fuelLog: FuelLog = { ...validFuelLogData };
      
      expect(typeof fuelLog.id).toBe('string');
      expect(typeof fuelLog.vehicle_id).toBe('string');
      expect(typeof fuelLog.date).toBe('string');
      expect(typeof fuelLog.fuel_type).toBe('string');
      expect(typeof fuelLog.quantity).toBe('number');
      expect(typeof fuelLog.price_per_unit).toBe('number');
      expect(typeof fuelLog.total_cost).toBe('number');
      expect(typeof fuelLog.created_at).toBe('string');
      expect(typeof fuelLog.updated_at).toBe('string');
    });

    it('should handle optional properties correctly', () => {
      const fuelLog: FuelLog = { ...validFuelLogData };
      
      if (fuelLog.odometer !== null) {
        expect(typeof fuelLog.odometer).toBe('number');
      }
      if (fuelLog.gas_station_id !== null) {
        expect(typeof fuelLog.gas_station_id).toBe('string');
      }
      if (fuelLog.notes !== null) {
        expect(typeof fuelLog.notes).toBe('string');
      }
    });
  });
}); 