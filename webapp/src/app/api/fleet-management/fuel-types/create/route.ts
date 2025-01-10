import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
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
      console.log('POST /api/fleet-management/fuel-types/create - No user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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