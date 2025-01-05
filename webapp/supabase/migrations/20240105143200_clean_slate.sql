-- Description: Clean slate - remove all tables, functions, triggers, and policies
-- Previous state: Mixed state with various issues
-- New state: Clean database ready for fresh setup

-- Step 1: Disable row level security for all tables to avoid policy conflicts
alter table if exists profiles disable row level security;
alter table if exists vehicles disable row level security;
alter table if exists fuel_logs disable row level security;

-- Step 2: Drop all triggers
drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists handle_profiles_updated_at on profiles;
drop trigger if exists handle_vehicles_updated_at on vehicles;
drop trigger if exists handle_fuel_logs_updated_at on fuel_logs;

-- Step 3: Drop all functions with cascade to handle dependencies
drop function if exists handle_new_user() cascade;
drop function if exists handle_updated_at() cascade;

-- Step 4: Drop all tables (in correct order due to dependencies)
drop table if exists fuel_logs cascade;
drop table if exists vehicles cascade;
drop table if exists profiles cascade;
drop table if exists profiles_backup cascade;
drop table if exists profiles_backup_20240105 cascade;

-- Step 5: Delete all users from auth.users
delete from auth.users;

-- Step 6: Remove all policies
-- Profiles policies
drop policy if exists "Public profiles are viewable by everyone." on profiles;
drop policy if exists "Users can insert their own profile." on profiles;
drop policy if exists "Users can update their own profile." on profiles;

-- Vehicles policies
drop policy if exists "Users can view their own vehicles" on vehicles;
drop policy if exists "Users can insert their own vehicles" on vehicles;
drop policy if exists "Users can update their own vehicles" on vehicles;
drop policy if exists "Users can delete their own vehicles" on vehicles;

-- Fuel logs policies
drop policy if exists "Users can view their own fuel logs" on fuel_logs;
drop policy if exists "Users can insert their own fuel logs" on fuel_logs;
drop policy if exists "Users can update their own fuel logs" on fuel_logs;
drop policy if exists "Users can delete their own fuel logs" on fuel_logs;

-- Step 7: Remove all realtime publications
drop publication if exists supabase_realtime;

-- Step 8: Drop extensions (but don't remove them completely as they might be needed by other databases)
drop extension if exists "uuid-ossp" cascade;

-- Confirmation message
do $$
begin
  raise notice 'Database has been reset to a clean slate.';
end $$; 