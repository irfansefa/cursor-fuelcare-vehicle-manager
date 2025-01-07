-- Update fuel_logs table to use fuel_types reference
BEGIN;

-- Add new column for fuel_type_id
ALTER TABLE public.fuel_logs
ADD COLUMN fuel_type_id uuid REFERENCES public.fuel_types(id);

-- Migrate existing data (this will need manual data migration in production)
-- UPDATE public.fuel_logs
-- SET fuel_type_id = (SELECT id FROM public.fuel_types WHERE name = fuel_type LIMIT 1);

-- Make fuel_type_id not null after data migration
-- ALTER TABLE public.fuel_logs
-- ALTER COLUMN fuel_type_id SET NOT NULL;

-- Drop old fuel_type column (after ensuring data is migrated)
-- ALTER TABLE public.fuel_logs
-- DROP COLUMN fuel_type;

-- Add index for better query performance
CREATE INDEX idx_fuel_logs_fuel_type_id ON public.fuel_logs(fuel_type_id);

COMMIT;

-- Rollback
-- BEGIN;
-- ALTER TABLE public.fuel_logs DROP COLUMN fuel_type_id;
-- DROP INDEX IF EXISTS idx_fuel_logs_fuel_type_id;
-- COMMIT; 