import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const updateFuelTypeSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  description: z.string().optional(),
  unit: z.enum(['liters', 'gallons']).optional(),
  properties: z.record(z.any()).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('PATCH /api/fleet-management/fuel-types/update/[id] - Start', { id: params.id });
    
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log('Session check:', {
      hasSession: !!session,
      error: sessionError?.message,
      userId: session?.user?.id
    });

    if (!session) {
      console.log('PATCH /api/fleet-management/fuel-types/update/[id] - No session found');
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

    const json = await request.json();
    
    // Validate request body
    const validationResult = updateFuelTypeSchema.safeParse(json);
    if (!validationResult.success) {
      console.log('Validation error:', validationResult.error);
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const fuelType = validationResult.data;
    const now = new Date().toISOString();

    console.log('Updating fuel type:', params.id);
    const { data, error } = await supabase
      .from('fuel_types')
      .update({
        ...fuelType,
        updated_at: now,
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Successfully updated fuel type:', data.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in PATCH /api/fleet-management/fuel-types/update/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to update fuel type' },
      { status: 500 }
    );
  }
} 