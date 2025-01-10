import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('GET /api/fleet-management/fuel-types/details/[id] - Start', { id: params.id });
    
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
    console.log('User check:', {
      hasUser: !!user,
      error: userError?.message,
      userId: user?.id
    });

    if (userError || !user) {
      console.log('GET /api/fleet-management/fuel-types/details/[id] - No user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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