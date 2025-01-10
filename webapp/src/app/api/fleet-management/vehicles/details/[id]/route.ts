import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('GET /api/fleet-management/vehicles/details/[id] - Start', { id: params.id });
    
    const supabase = await createSupabaseServerClient();
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log('User check:', {
      hasUser: !!user,
      error: userError?.message,
      userId: user?.id
    });

    if (userError || !user) {
      console.log('GET /api/fleet-management/vehicles/details/[id] - No user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Fetching vehicle details:', params.id);
    const { data: vehicle, error } = await supabase
      .from('vehicles')
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
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }

    console.log('Successfully fetched vehicle details');
    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Error in GET /api/fleet-management/vehicles/details/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 