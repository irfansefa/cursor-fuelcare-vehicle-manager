-- migrate:up
ALTER TABLE fuel_logs
ADD COLUMN location text;

COMMENT ON COLUMN fuel_logs.location IS 'The location where the fuel was added';

-- migrate:down
ALTER TABLE fuel_logs
DROP COLUMN location; 