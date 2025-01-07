-- Add compatible fuel types array to vehicles table
ALTER TABLE public.vehicles
ADD COLUMN compatible_fuel_types uuid[] DEFAULT '{}',
ADD COLUMN preferred_fuel_type uuid;

-- Add foreign key constraint for preferred fuel type
ALTER TABLE public.vehicles
ADD CONSTRAINT fk_vehicle_preferred_fuel_type
FOREIGN KEY (preferred_fuel_type)
REFERENCES public.fuel_types(id);

-- Add check constraint to ensure preferred fuel type is in compatible types
ALTER TABLE public.vehicles
ADD CONSTRAINT check_preferred_fuel_type
CHECK (preferred_fuel_type IS NULL OR preferred_fuel_type = ANY(compatible_fuel_types));

-- Create function to validate compatible fuel types
CREATE OR REPLACE FUNCTION validate_compatible_fuel_types()
RETURNS TRIGGER AS $$
BEGIN
    -- Log the values for debugging
    RAISE NOTICE 'Validating vehicle fuel types - Compatible Types: %, Preferred Type: %', NEW.compatible_fuel_types, NEW.preferred_fuel_type;
    
    -- Check if all fuel types in the array exist
    IF EXISTS (
        SELECT 1
        FROM unnest(NEW.compatible_fuel_types) AS ft(id)
        LEFT JOIN public.fuel_types ON fuel_types.id = ft.id
        WHERE fuel_types.id IS NULL
    ) THEN
        RAISE EXCEPTION 'Invalid fuel type in compatible_fuel_types array';
    END IF;
    
    -- Log successful validation
    RAISE NOTICE 'Fuel types validation passed for vehicle %', NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for compatible fuel types validation
CREATE TRIGGER validate_compatible_fuel_types_trigger
    BEFORE INSERT OR UPDATE ON public.vehicles
    FOR EACH ROW
    EXECUTE FUNCTION validate_compatible_fuel_types();

-- Add validation trigger to ensure fuel type exists in fuel logs
CREATE OR REPLACE FUNCTION validate_fuel_log_type()
RETURNS TRIGGER AS $$
BEGIN
    -- Log the values for debugging
    RAISE NOTICE 'Validating fuel log - Vehicle ID: %, Fuel Type id: %', NEW.vehicle_id, NEW.fuel_type_id;
    
    -- Check if the fuel type exists in vehicle's compatible types
    IF NOT EXISTS (
        SELECT 1 FROM public.vehicles v
        JOIN public.fuel_types ft ON ft.id = ANY(v.compatible_fuel_types)
        WHERE v.id = NEW.vehicle_id
        AND ft.id = NEW.fuel_type_id
    ) THEN
        RAISE EXCEPTION 'Invalid fuel type for vehicle';
    END IF;
    
    -- Log successful validation
    RAISE NOTICE 'Fuel log validation passed for vehicle %', NEW.vehicle_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_fuel_log_type_trigger
    BEFORE INSERT OR UPDATE ON public.fuel_logs
    FOR EACH ROW
    EXECUTE FUNCTION validate_fuel_log_type();

-- Rollback SQL
-- DROP TRIGGER IF EXISTS validate_fuel_log_type_trigger ON public.fuel_logs;
-- DROP FUNCTION IF EXISTS validate_fuel_log_type();
-- DROP TRIGGER IF EXISTS validate_compatible_fuel_types_trigger ON public.vehicles;
-- DROP FUNCTION IF EXISTS validate_compatible_fuel_types();
-- ALTER TABLE public.vehicles DROP CONSTRAINT IF EXISTS check_preferred_fuel_type;
-- ALTER TABLE public.vehicles DROP CONSTRAINT IF EXISTS fk_vehicle_preferred_fuel_type;
-- ALTER TABLE public.vehicles DROP COLUMN IF EXISTS preferred_fuel_type;
-- ALTER TABLE public.vehicles DROP COLUMN IF EXISTS compatible_fuel_types; 