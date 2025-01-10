import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
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

  const json = await request.json();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('vehicles')
    .update({
      make: json.make,
      model: json.model,
      year: json.year,
      license_plate: json.licensePlate,
      vin: json.vin,
      status: json.status,
      compatible_fuel_types: json.compatible_fuel_types,
      preferred_fuel_type: json.preferred_fuel_type,
      updated_at: now,
    })
    .eq('id', params.id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
} 