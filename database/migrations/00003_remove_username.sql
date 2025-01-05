-- Description: Remove username column from profiles table
-- Previous state: Profiles table has username column
-- New state: Profiles table without username column

-- Step 1: Drop the unique constraint on username
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_username_key;

-- Step 2: Remove the username column
ALTER TABLE public.profiles DROP COLUMN IF EXISTS username;

-- Step 3: Update the trigger function to remove username handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
begin
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );
  return new;
end;
$$; 