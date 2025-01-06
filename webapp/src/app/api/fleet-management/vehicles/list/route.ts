import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    console.log('GET /api/fleet-management/vehicles/list - Start');
    
    const cookieStore = cookies();
    console.log('Cookie store:', {
      hasGetAll: !!cookieStore.getAll,
      hasGet: !!cookieStore.get,
    });

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
      console.log('GET /api/fleet-management/vehicles/list - No session found');
      return NextResponse.json({ error: 'Unauthorized - No session' }, { status: 401 });
    }

    console.log('Fetching vehicles for user:', session.user.id);
    const { data: vehicles, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Successfully fetched vehicles:', vehicles?.length);
    return NextResponse.json(vehicles);
  } catch (error) {
    console.error('Error in GET /api/fleet-management/vehicles/list:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 