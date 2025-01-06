-- Add status column to vehicles table
ALTER TABLE vehicles
ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'active'
CHECK (status IN ('active', 'maintenance', 'inactive'));

-- Add comment to the column
COMMENT ON COLUMN vehicles.status IS 'Vehicle status: active, maintenance, or inactive';

-- Revert changes if needed
-- ALTER TABLE vehicles DROP COLUMN status; 