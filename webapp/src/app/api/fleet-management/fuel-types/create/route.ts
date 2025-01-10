import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase';
import { CreateFuelTypeDTO } from '@/features/fuel/types';
import { z } from 'zod';

const createFuelTypeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  unit: z.enum(['liters', 'gallons']).default('liters'),
  properties: z.record(z.any()).optional().default({}),
  status: z.enum(['active', 'inactive']).default('active'),
});

export async function POST(request: Request) {
  try {
    console.log('POST /api/fleet-management/fuel-types/create - Start');
    const supabase = await createSupabaseServerClient();
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log('User check:', { hasUser: !!user, error: userError?.message });

    if (userError || !user) {
      console.log('Unauthorized: No user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await request.json();
    console.log('Request body:', json);
    
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
    console.log('Validated fuel type:', fuelType);

    const { data, error } = await supabase
      .from('fuel_types')
      .insert({
        name: fuelType.name,
        description: fuelType.description,
        unit: fuelType.unit,
        properties: fuelType.properties,
        status: fuelType.status,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Successfully created fuel type:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/fleet-management/fuel-types/create:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}