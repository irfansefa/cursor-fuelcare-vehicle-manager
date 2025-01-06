-- Drop the unique constraint on VIN
ALTER TABLE public.vehicles DROP CONSTRAINT IF EXISTS vehicles_vin_key;

-- Modify year and license_plate to be nullable
ALTER TABLE public.vehicles ALTER COLUMN year DROP NOT NULL;
ALTER TABLE public.vehicles ALTER COLUMN license_plate DROP NOT NULL; 