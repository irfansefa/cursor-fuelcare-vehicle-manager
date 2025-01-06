import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('DELETE /api/fleet-management/vehicles/delete/[id] - Start', { id: params.id });
    
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log('Session check:', {
      hasSession: !!session,
      error: sessionError?.message,
      userId: session?.user?.id
    });

    if (!session) {
      console.log('DELETE /api/fleet-management/vehicles/delete/[id] - No session found');
      return NextResponse.json({ error: 'Unauthorized - No session' }, { status: 401 });
    }

    // Verify vehicle ownership
    const { data: existingVehicle } = await supabase
      .from('vehicles')
      .select('id')
      .eq('id', params.id)
      .eq('user_id', session.user.id)
      .single();

    if (!existingVehicle) {
      return NextResponse.json({ error: 'Vehicle not found or unauthorized' }, { status: 404 });
    }

    console.log('Deleting vehicle:', params.id);
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', params.id)
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Successfully deleted vehicle:', params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error in DELETE /api/fleet-management/vehicles/delete/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 