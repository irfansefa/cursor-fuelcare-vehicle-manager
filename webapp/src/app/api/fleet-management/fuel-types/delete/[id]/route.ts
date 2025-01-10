import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('DELETE /api/fleet-management/fuel-types/delete/[id] - Start', { id: params.id });
    
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
      console.log('DELETE /api/fleet-management/fuel-types/delete/[id] - No user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify fuel type exists
    const { data: existingFuelType } = await supabase
      .from('fuel_types')
      .select('id')
      .eq('id', params.id)
      .single();

    if (!existingFuelType) {
      return NextResponse.json({ error: 'Fuel type not found' }, { status: 404 });
    }

    console.log('Deleting fuel type:', params.id);
    const { error } = await supabase
      .from('fuel_types')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Successfully deleted fuel type:', params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error in DELETE /api/fleet-management/fuel-types/delete/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to delete fuel type' },
      { status: 500 }
    );
  }
} 