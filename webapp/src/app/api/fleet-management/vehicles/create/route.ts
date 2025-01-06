import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

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
          created_at: now,
          updated_at: now,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Successfully created vehicle:', data.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/fleet-management/vehicles/create:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 