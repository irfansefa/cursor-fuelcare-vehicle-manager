-- Insert test vehicle with compatible fuel types
INSERT INTO vehicles (
  id,
  user_id,
  make,
  model,
  year,
  license_plate,
  compatible_fuel_types,
  preferred_fuel_type
) VALUES (
  '123e4567-e89b-12d3-a456-426614174000',  -- This matches our mockVehicleId in the showcase
  (SELECT id FROM profiles LIMIT 1),  -- Get first user's ID
  'Toyota',
  'Camry',
  2023,
  'TEST123',
  ARRAY(
    SELECT id FROM fuel_types 
    WHERE name IN ('Regular Unleaded', 'Premium Unleaded')
  ),
  (SELECT id FROM fuel_types WHERE name = 'Regular Unleaded' LIMIT 1)
); 