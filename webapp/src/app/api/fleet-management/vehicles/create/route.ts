import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

interface FuelType {
  id: string;
  name: string;
}

export async function POST(request: Request) {
  try {
    console.log('POST /api/fleet-management/vehicles/create - Start');
    
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get request body
    const json = await request.json();

    // Add user_id to the vehicle data
    const vehicleData = {
      ...json,
      user_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Create the vehicle
    const { data: vehicle, error } = await supabase
      .from('vehicles')
      .insert(vehicleData)
      .select(`
        *,
        compatible_fuel_types,
        preferred_fuel_type,
        fuel_types:preferred_fuel_type (
          id,
          name,
          unit
        )
      `)
      .single();

    if (error) {
      console.error('Error creating vehicle:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Error in POST /api/fleet-management/vehicles/create:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 