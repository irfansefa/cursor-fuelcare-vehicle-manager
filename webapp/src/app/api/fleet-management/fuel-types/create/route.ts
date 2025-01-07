import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { CreateFuelTypeDTO } from '@/features/fuel/types';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const createFuelTypeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  unit: z.enum(['liters', 'gallons']),
  properties: z.record(z.any()).optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

export async function POST(request: Request) {
  try {
    console.log('POST /api/fleet-management/fuel-types/create - Start');
    
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log('Session check:', {
      hasSession: !!session,
      error: sessionError?.message,
      userId: session?.user?.id
    });

    if (!session) {
      console.log('POST /api/fleet-management/fuel-types/create - No session found');
      return NextResponse.json({ error: 'Unauthorized - No session' }, { status: 401 });
    }

    const json = await request.json();
    
    // Validate request body
    const validationResult = createFuelTypeSchema.safeParse(json);
    if (!validationResult.success) {
      console.log('Validation error:', validationResult.error);
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const fuelType = validationResult.data;
    const now = new Date().toISOString();

    console.log('Creating fuel type');
    const { data, error } = await supabase
      .from('fuel_types')
      .insert([{
        ...fuelType,
        created_at: now,
        updated_at: now,
      }])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Successfully created fuel type:', data.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/fleet-management/fuel-types/create:', error);
    return NextResponse.json(
      { error: 'Failed to create fuel type' },
      { status: 500 }
    );
  }
} 