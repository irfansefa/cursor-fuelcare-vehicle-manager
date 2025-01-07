-- Test user profile (replace USER_ID with your Supabase user ID)
INSERT INTO profiles (id, full_name, updated_at)
VALUES 
  ('USER_ID', 'Test User', NOW())
ON CONFLICT (id) DO UPDATE 
SET full_name = EXCLUDED.full_name;

-- Sample fuel types with properties
INSERT INTO fuel_types (id, name, description, unit, properties, status)
VALUES
  ('11111111-2222-3333-4444-555555555555', 'Regular Unleaded', 'Standard unleaded gasoline', 'liters', '{"octane": 87, "ethanol_content": "10%"}'::jsonb, 'active'),
  ('22222222-3333-4444-5555-666666666666', 'Premium Unleaded', 'High octane unleaded gasoline', 'liters', '{"octane": 91, "ethanol_content": "10%"}'::jsonb, 'active'),
  ('33333333-4444-5555-6666-777777777777', 'Super Premium', 'Premium high octane gasoline', 'liters', '{"octane": 95, "ethanol_content": "10%"}'::jsonb, 'active'),
  ('44444444-5555-6666-7777-888888888888', 'Diesel', 'Standard diesel fuel', 'liters', '{"cetane": 51, "sulfur": "ultra low"}'::jsonb, 'active'),
  ('55555555-6666-7777-8888-999999999999', 'Bio-Diesel', 'Biodiesel fuel blend', 'liters', '{"blend": "B20", "renewable_content": "20%"}'::jsonb, 'active');

-- Sample vehicles
INSERT INTO vehicles (id, user_id, make, model, year, license_plate, vin, status, compatible_fuel_types, preferred_fuel_type)
VALUES
  -- Family SUV with regular usage pattern
  ('11111111-1111-1111-1111-111111111111', 'USER_ID', 'Toyota', 'RAV4', 2020, 'ABC123', 'JT3HP10V5X7123456', 'active', 
   ARRAY['11111111-2222-3333-4444-555555555555']::uuid[], 
   '11111111-2222-3333-4444-555555555555'),
  -- Work vehicle with high mileage
  ('22222222-2222-2222-2222-222222222222', 'USER_ID', 'Ford', 'Transit', 2019, 'XYZ789', 'WF0XXXTTGXKY12345', 'active', 
   ARRAY['44444444-5555-6666-7777-888888888888', '55555555-6666-7777-8888-999999999999']::uuid[],
   '44444444-5555-6666-7777-888888888888'),
  -- Weekend car with occasional use
  ('33333333-3333-3333-3333-333333333333', 'USER_ID', 'Mazda', 'MX-5', 2021, 'DEF456', 'JM1NDAL75M0123456', 'active', 
   ARRAY['22222222-3333-4444-5555-666666666666', '33333333-4444-5555-6666-777777777777']::uuid[],
   '22222222-3333-4444-5555-666666666666');

-- Sample fuel logs for Toyota RAV4 (Regular usage, ~12,000 km/year, ~8.5 L/100km)
INSERT INTO fuel_logs (vehicle_id, date, fuel_type_id, quantity, price_per_unit, total_cost, odometer, location, notes)
VALUES
  -- Starting from January 2023, monthly fill-ups
  ('11111111-1111-1111-1111-111111111111', '2023-01-05 10:00:00+00', '11111111-2222-3333-4444-555555555555', 45.5, 1.75, 79.63, 15000, 'Shell Station - Downtown', 'Regular fill-up'),
  ('11111111-1111-1111-1111-111111111111', '2023-02-03 14:30:00+00', '11111111-2222-3333-4444-555555555555', 47.2, 1.78, 84.02, 16000, 'Esso - Highway 1', NULL),
  ('11111111-1111-1111-1111-111111111111', '2023-03-07 09:15:00+00', '11111111-2222-3333-4444-555555555555', 46.8, 1.82, 85.18, 17100, 'Petro-Canada - Main St', NULL),
  ('11111111-1111-1111-1111-111111111111', '2023-04-12 16:45:00+00', '11111111-2222-3333-4444-555555555555', 44.9, 1.89, 84.86, 18150, 'Shell Station - Downtown', 'Price increase'),
  ('11111111-1111-1111-1111-111111111111', '2023-05-18 11:20:00+00', '11111111-2222-3333-4444-555555555555', 46.3, 1.92, 88.90, 19200, 'Costco Gas', 'Better price at Costco'),
  ('11111111-1111-1111-1111-111111111111', '2023-06-22 13:10:00+00', '11111111-2222-3333-4444-555555555555', 48.1, 1.95, 93.80, 20300, 'Esso - Highway 1', 'Summer road trip'),
  ('11111111-1111-1111-1111-111111111111', '2023-07-25 15:40:00+00', '11111111-2222-3333-4444-555555555555', 47.5, 1.98, 94.05, 21400, 'Shell Station - Downtown', NULL),
  ('11111111-1111-1111-1111-111111111111', '2023-08-30 12:25:00+00', '11111111-2222-3333-4444-555555555555', 45.8, 1.94, 88.85, 22500, 'Petro-Canada - Main St', NULL),
  ('11111111-1111-1111-1111-111111111111', '2023-09-28 10:55:00+00', '11111111-2222-3333-4444-555555555555', 46.2, 1.91, 88.24, 23600, 'Costco Gas', 'Good savings'),
  ('11111111-1111-1111-1111-111111111111', '2023-10-31 14:15:00+00', '11111111-2222-3333-4444-555555555555', 45.9, 1.88, 86.29, 24700, 'Shell Station - Downtown', NULL),
  ('11111111-1111-1111-1111-111111111111', '2023-11-29 09:30:00+00', '11111111-2222-3333-4444-555555555555', 47.3, 1.85, 87.51, 25800, 'Esso - Highway 1', 'Winter fuel'),
  ('11111111-1111-1111-1111-111111111111', '2023-12-30 16:20:00+00', '11111111-2222-3333-4444-555555555555', 46.8, 1.83, 85.64, 26900, 'Petro-Canada - Main St', NULL),
  ('11111111-1111-1111-1111-111111111111', '2024-01-15 11:45:00+00', '11111111-2222-3333-4444-555555555555', 45.5, 1.81, 82.36, 28000, 'Shell Station - Downtown', 'New Year fill-up');

-- Sample fuel logs for Ford Transit (High mileage, ~30,000 km/year, ~11 L/100km)
INSERT INTO fuel_logs (vehicle_id, date, fuel_type_id, quantity, price_per_unit, total_cost, odometer, location, notes)
VALUES
  -- More frequent fill-ups due to work usage
  ('22222222-2222-2222-2222-222222222222', '2023-01-03 08:00:00+00', '44444444-5555-6666-7777-888888888888', 65.5, 1.65, 108.08, 45000, 'Shell Station - Industrial', 'Work vehicle fill-up'),
  ('22222222-2222-2222-2222-222222222222', '2023-01-17 17:30:00+00', '44444444-5555-6666-7777-888888888888', 68.2, 1.68, 114.58, 47500, 'Petro-Canada - Highway', NULL),
  ('22222222-2222-2222-2222-222222222222', '2023-02-01 09:15:00+00', '44444444-5555-6666-7777-888888888888', 67.8, 1.70, 115.26, 50000, 'Esso - Industrial Park', 'Regular maintenance check'),
  ('22222222-2222-2222-2222-222222222222', '2023-02-15 16:45:00+00', '44444444-5555-6666-7777-888888888888', 66.9, 1.72, 115.07, 52500, 'Shell Station - Industrial', NULL),
  ('22222222-2222-2222-2222-222222222222', '2023-03-01 11:20:00+00', '44444444-5555-6666-7777-888888888888', 69.3, 1.75, 121.28, 55000, 'Petro-Canada - Highway', 'Long delivery route'),
  ('22222222-2222-2222-2222-222222222222', '2023-03-15 13:10:00+00', '44444444-5555-6666-7777-888888888888', 67.1, 1.78, 119.44, 57500, 'Esso - Industrial Park', NULL),
  ('22222222-2222-2222-2222-222222222222', '2023-04-01 15:40:00+00', '44444444-5555-6666-7777-888888888888', 68.5, 1.80, 123.30, 60000, 'Shell Station - Industrial', '60000 km service due'),
  ('22222222-2222-2222-2222-222222222222', '2023-04-15 12:25:00+00', '44444444-5555-6666-7777-888888888888', 66.8, 1.82, 121.58, 62500, 'Petro-Canada - Highway', NULL),
  ('22222222-2222-2222-2222-222222222222', '2023-05-01 10:55:00+00', '44444444-5555-6666-7777-888888888888', 67.2, 1.85, 124.32, 65000, 'Esso - Industrial Park', 'Price increase noted'),
  ('22222222-2222-2222-2222-222222222222', '2023-05-15 14:15:00+00', '44444444-5555-6666-7777-888888888888', 68.9, 1.88, 129.53, 67500, 'Shell Station - Industrial', NULL);

-- Sample fuel logs for Mazda MX-5 (Weekend car, ~5,000 km/year, ~7 L/100km)
INSERT INTO fuel_logs (vehicle_id, date, fuel_type_id, quantity, price_per_unit, total_cost, odometer, location, notes)
VALUES
  -- Less frequent fill-ups, premium fuel
  ('33333333-3333-3333-3333-333333333333', '2023-01-15 11:00:00+00', '22222222-3333-4444-5555-666666666666', 35.5, 1.95, 69.23, 5000, 'Shell Station - Downtown', 'Weekend car fill-up'),
  ('33333333-3333-3333-3333-333333333333', '2023-03-20 14:30:00+00', '22222222-3333-4444-5555-666666666666', 36.2, 1.98, 71.68, 5400, 'Esso - City Center', 'Spring drive'),
  ('33333333-3333-3333-3333-333333333333', '2023-05-25 09:15:00+00', '22222222-3333-4444-5555-666666666666', 34.8, 2.05, 71.34, 5800, 'Shell Station - Downtown', 'Track day prep'),
  ('33333333-3333-3333-3333-333333333333', '2023-07-30 16:45:00+00', '22222222-3333-4444-5555-666666666666', 35.9, 2.10, 75.39, 6200, 'Petro-Canada - Main St', 'Summer cruising'),
  ('33333333-3333-3333-3333-333333333333', '2023-10-05 11:20:00+00', '22222222-3333-4444-5555-666666666666', 36.3, 2.08, 75.50, 6600, 'Shell Station - Downtown', 'Fall colors tour'),
  ('33333333-3333-3333-3333-333333333333', '2023-12-10 13:10:00+00', '22222222-3333-4444-5555-666666666666', 35.1, 2.02, 70.90, 7000, 'Esso - City Center', 'Winter storage prep'); 
  ('33333333-3333-3333-3333-333333333333', '2023-05-15 14:15:00+00', '33333333-4444-5555-6666-777777777777', 68.9, 1.88, 129.53, 67500, 'Shell Station - Industrial', NULL);