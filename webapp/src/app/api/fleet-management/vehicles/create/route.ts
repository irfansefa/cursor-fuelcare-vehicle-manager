import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

interface FuelType {
  id: string;
  name: string;
}

export async function POST(request: Request) {
  try {
    console.log('POST /api/fleet-management/vehicles/create - Start');
    
    // Create a Supabase client using the auth helpers
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get the session directly from Supabase
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log('Session check:', {
      hasSession: !!session,
      error: sessionError?.message,
      userId: session?.user?.id
    });

    if (!session) {
      console.log('POST /api/fleet-management/vehicles/create - No session found');
      return NextResponse.json({ error: 'Unauthorized - No session' }, { status: 401 });
    }

    const json = await request.json();
    const now = new Date().toISOString();

    // Log the request data
    console.log('Vehicle creation request:', {
      ...json,
      user_id: session.user.id,
      compatible_fuel_types: json.compatibleFuelTypes,
      preferred_fuel_type: json.preferredFuelType
    });

    // Get fuel type UUIDs
    console.log('Fetching fuel types with names:', json.compatibleFuelTypes);
    
    const { data: fuelTypes, error: fuelTypesError } = await supabase
      .from('fuel_types')
      .select('id, name')
      .or(json.compatibleFuelTypes.map((type: string) => `name.ilike.%${type}%`).join(','));

    if (fuelTypesError) {
      console.error('Error fetching fuel types:', fuelTypesError);
      return NextResponse.json({ error: 'Failed to fetch fuel types' }, { status: 500 });
    }

    console.log('Found fuel types:', fuelTypes);

    if (!fuelTypes || fuelTypes.length !== json.compatibleFuelTypes.length) {
      // Fetch all fuel types to show available options in error message
      const { data: allTypes } = await supabase
        .from('fuel_types')
        .select('name')
        .eq('status', 'active');

      console.error('Some fuel types not found:', {
        requested: json.compatibleFuelTypes,
        found: fuelTypes?.map(ft => ft.name),
        availableTypes: allTypes?.map(t => t.name)
      });
      return NextResponse.json({ 
        error: 'Invalid fuel types', 
        availableTypes: allTypes?.map(t => t.name)
      }, { status: 400 });
    }

    // Map fuel type names to UUIDs
    const fuelTypeMap = new Map(fuelTypes.map((ft: FuelType) => [ft.name.toLowerCase(), ft.id]));
    const compatibleFuelTypeIds = json.compatibleFuelTypes.map((name: string) => fuelTypeMap.get(name.toLowerCase()));
    const preferredFuelTypeId = json.preferredFuelType ? fuelTypeMap.get(json.preferredFuelType.toLowerCase()) : null;

    console.log('Mapped fuel types:', {
      originalTypes: json.compatibleFuelTypes,
      mappedIds: compatibleFuelTypeIds,
      preferredType: json.preferredFuelType,
      preferredId: preferredFuelTypeId
    });

    console.log('Creating vehicle for user:', session.user.id);
    const { data, error } = await supabase
      .from('vehicles')
      .insert([
        {
          make: json.make,
          model: json.model,
          year: json.year,
          license_plate: json.licensePlate,
          vin: json.vin,
          status: json.status,
          user_id: session.user.id,
          compatible_fuel_types: compatibleFuelTypeIds,
          preferred_fuel_type: preferredFuelTypeId,
          created_at: now,
          updated_at: now,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      console.error('Failed query details:', {
        table: 'vehicles',
        operation: 'insert',
        data: {
          make: json.make,
          model: json.model,
          year: json.year,
          license_plate: json.licensePlate,
          vin: json.vin,
          status: json.status,
          user_id: session.user.id,
          compatible_fuel_types: compatibleFuelTypeIds,
          preferred_fuel_type: preferredFuelTypeId,
          created_at: now,
          updated_at: now,
        }
      });
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Successfully created vehicle:', {
      id: data.id,
      compatible_fuel_types: data.compatible_fuel_types,
      preferred_fuel_type: data.preferred_fuel_type
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/fleet-management/vehicles/create:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 