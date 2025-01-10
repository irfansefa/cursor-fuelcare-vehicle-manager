import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase';
import { FuelTypeFilters } from '@/features/fuel/types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: fuelTypes, error } = await supabase
      .from('fuel_types')
      .select('*')
      .order('name');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(fuelTypes);
  } catch (error) {
    console.error('Error in GET /api/fleet-management/fuel-types/list:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 