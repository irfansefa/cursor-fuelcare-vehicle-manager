import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('GET /api/fleet-management/fuel-types/details/[id] - Start', { id: params.id });
    
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log('Session check:', {
      hasSession: !!session,
      error: sessionError?.message,
      userId: session?.user?.id
    });

    if (!session) {
      console.log('GET /api/fleet-management/fuel-types/details/[id] - No session found');
      return NextResponse.json({ error: 'Unauthorized - No session' }, { status: 401 });
    }

    console.log('Fetching fuel type details:', params.id);
    const { data, error } = await supabase
      .from('fuel_types')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Fuel type not found' }, { status: 404 });
    }

    console.log('Successfully fetched fuel type details');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/fleet-management/fuel-types/details/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fuel type' },
      { status: 500 }
    );
  }
} 