import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('PATCH /api/fleet-management/vehicles/update/[id] - Start', { id: params.id });
    
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log('Session check:', {
      hasSession: !!session,
      error: sessionError?.message,
      userId: session?.user?.id
    });

    if (!session) {
      console.log('PATCH /api/fleet-management/vehicles/update/[id] - No session found');
      return NextResponse.json({ error: 'Unauthorized - No session' }, { status: 401 });
    }

    // Verify vehicle ownership
    const { data: existingVehicle } = await supabase
      .from('vehicles')
      .select('id')
      .eq('id', params.id)
      .eq('user_id', session.user.id)
      .single();

    if (!existingVehicle) {
      return NextResponse.json({ error: 'Vehicle not found or unauthorized' }, { status: 404 });
    }

    const json = await request.json();
    const now = new Date().toISOString();

    console.log('Updating vehicle:', params.id);
    const { data, error } = await supabase
      .from('vehicles')
      .update({
        make: json.make,
        model: json.model,
        year: json.year,
        license_plate: json.licensePlate,
        vin: json.vin,
        status: json.status,
        compatible_fuel_types: json.compatible_fuel_types,
        preferred_fuel_type: json.preferred_fuel_type,
        updated_at: now,
      })
      .eq('id', params.id)
      .eq('user_id', session.user.id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Successfully updated vehicle:', data.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in PATCH /api/fleet-management/vehicles/update/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 