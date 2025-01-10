import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
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

    // Add user authentication check
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch vehicles for the authenticated user
    const { data: vehicles, error } = await supabase
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
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(vehicles);
  } catch (error) {
    console.error('Error in GET /api/fleet-management/vehicles/list:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 