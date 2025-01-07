import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('DELETE /api/fleet-management/fuel-types/delete/[id] - Start', { id: params.id });
    
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log('Session check:', {
      hasSession: !!session,
      error: sessionError?.message,
      userId: session?.user?.id
    });

    if (!session) {
      console.log('DELETE /api/fleet-management/fuel-types/delete/[id] - No session found');
      return NextResponse.json({ error: 'Unauthorized - No session' }, { status: 401 });
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