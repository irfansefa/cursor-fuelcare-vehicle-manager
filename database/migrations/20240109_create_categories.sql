-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  color VARCHAR(50) NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own categories"
  ON categories FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own categories"
  ON categories FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own categories"
  ON categories FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own categories"
  ON categories FOR DELETE
  USING (auth.uid() = user_id);

-- Update handle_new_user function to create default categories
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
begin
  -- Create profile
  INSERT INTO public.profiles (id, full_name, username, avatar_url)
  VALUES (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'username', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );

  -- Create default categories
  INSERT INTO categories (name, description, color, user_id)
  VALUES 
    ('Maintenance', 'Regular vehicle maintenance and repairs', 'bg-blue-500', new.id),
    ('Fuel', 'Fuel expenses and refills', 'bg-green-500', new.id),
    ('Insurance', 'Vehicle insurance payments', 'bg-purple-500', new.id),
    ('Tax', 'Vehicle-related taxes and fees', 'bg-red-500', new.id),
    ('Cleaning', 'Car washing and cleaning services', 'bg-cyan-500', new.id),
    ('Parking', 'Parking fees and permits', 'bg-orange-500', new.id),
    ('Accessories', 'Vehicle accessories and modifications', 'bg-yellow-500', new.id),
    ('Service', 'Professional service and inspection fees', 'bg-indigo-500', new.id),
    ('Tires', 'Tire replacement and maintenance', 'bg-emerald-500', new.id),
    ('Registration', 'Vehicle registration and documentation', 'bg-rose-500', new.id);

  return new;
end;
$$; 