import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createSupabaseServerClient();
  console.log('DELETE /api/fleet-management/vehicles/delete/[id] - Start', { id: params.id });
  
  const { data: { user } } = await supabase.auth.getUser();

  console.log('User check:', {
    hasUser: !!user,
    userId: user?.id
  });

  if (!user) {
    console.log('DELETE /api/fleet-management/vehicles/delete/[id] - No user found');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify vehicle ownership
  const { data: existingVehicle } = await supabase
    .from('vehicles')
    .select('id')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (!existingVehicle) {
    return NextResponse.json({ error: 'Vehicle not found or unauthorized' }, { status: 404 });
  }

  console.log('Deleting vehicle:', params.id);
  const { error } = await supabase
    .from('vehicles')
    .delete()
    .eq('id', params.id)
    .eq('user_id', user.id);

  if (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('Successfully deleted vehicle:', params.id);
  return new NextResponse(null, { status: 204 });
} 