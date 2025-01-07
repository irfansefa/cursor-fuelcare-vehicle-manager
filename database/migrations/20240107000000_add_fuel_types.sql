-- Create enum for fuel units
CREATE TYPE fuel_unit AS ENUM ('liters', 'gallons');

-- Create fuel types table
CREATE TABLE fuel_types (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    unit fuel_unit NOT NULL DEFAULT 'liters',
    properties JSONB DEFAULT '{}'::jsonb,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE fuel_types ENABLE ROW LEVEL SECURITY;

-- Create policy for select
CREATE POLICY fuel_types_select_policy ON fuel_types
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Create policy for insert
CREATE POLICY fuel_types_insert_policy ON fuel_types
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Create policy for update
CREATE POLICY fuel_types_update_policy ON fuel_types
    FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Create policy for delete
CREATE POLICY fuel_types_delete_policy ON fuel_types
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- Add updated_at trigger
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON fuel_types
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default fuel types
INSERT INTO fuel_types (name, description, unit, properties) VALUES
    ('Regular Unleaded', 'Standard unleaded gasoline', 'liters', '{"octane": 87}'::jsonb),
    ('Premium Unleaded', 'High octane unleaded gasoline', 'liters', '{"octane": 91}'::jsonb),
    ('Super Premium', 'Premium high octane gasoline', 'liters', '{"octane": 95}'::jsonb),
    ('Diesel', 'Standard diesel fuel', 'liters', '{"type": "standard"}'::jsonb),
    ('Bio-Diesel', 'Biodiesel fuel blend', 'liters', '{"bio_content": "B20"}'::jsonb);

-- Add indexes
CREATE INDEX idx_fuel_types_status ON fuel_types(status);
CREATE INDEX idx_fuel_types_name ON fuel_types(name);

-- Rollback SQL
-- DROP TABLE IF EXISTS fuel_types CASCADE;
-- DROP TYPE IF EXISTS fuel_unit CASCADE; 