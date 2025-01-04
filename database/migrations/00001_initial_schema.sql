-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid REFERENCES auth.users ON DELETE CASCADE,
    updated_at timestamp with time zone,
    username text UNIQUE,
    full_name text,
    avatar_url text,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.vehicles (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    make text NOT NULL,
    model text NOT NULL,
    year integer NOT NULL,
    license_plate text,
    vin text UNIQUE,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.fuel_logs (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    vehicle_id uuid REFERENCES public.vehicles(id) ON DELETE CASCADE,
    date timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    fuel_type text NOT NULL,
    quantity numeric(10,2) NOT NULL,
    price_per_unit numeric(10,2) NOT NULL,
    total_cost numeric(10,2) NOT NULL,
    odometer numeric(10,2),
    gas_station_id uuid,
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fuel_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile." ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own vehicles" ON public.vehicles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own vehicles" ON public.vehicles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own vehicles" ON public.vehicles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own vehicles" ON public.vehicles
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own fuel logs" ON public.fuel_logs
    FOR SELECT USING (
        vehicle_id IN (
            SELECT id FROM public.vehicles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert their own fuel logs" ON public.fuel_logs
    FOR INSERT WITH CHECK (
        vehicle_id IN (
            SELECT id FROM public.vehicles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own fuel logs" ON public.fuel_logs
    FOR UPDATE USING (
        vehicle_id IN (
            SELECT id FROM public.vehicles WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete their own fuel logs" ON public.fuel_logs
    FOR DELETE USING (
        vehicle_id IN (
            SELECT id FROM public.vehicles WHERE user_id = auth.uid()
        )
    ); 