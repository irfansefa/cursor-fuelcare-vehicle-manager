import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { FuelTypeFilters } from '@/features/fuel/types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    console.log('GET /api/fleet-management/fuel-types/list - Start');
    
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log('Session check:', {
      hasSession: !!session,
      error: sessionError?.message,
      userId: session?.user?.id
    });

    if (!session) {
      console.log('GET /api/fleet-management/fuel-types/list - No session found');
      return NextResponse.json({ error: 'Unauthorized - No session' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    console.log('Fetching fuel types with filters:', { status, search });
    let query = supabase.from('fuel_types').select('*');

    if (status) {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    const { data, error } = await query.order('name', { ascending: true });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Successfully fetched fuel types:', data?.length);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/fleet-management/fuel-types/list:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fuel types' },
      { status: 500 }
    );
  }
} 