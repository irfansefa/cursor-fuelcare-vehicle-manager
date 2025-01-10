import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";
import { z } from "zod";

const fuelLogSchema = z.object({
  vehicleId: z.string().min(1, 'Vehicle is required'),
  date: z.string().min(1, 'Date is required'),
  fuelTypeId: z.string().min(1, 'Fuel type is required'),
  quantity: z.number().min(0, 'Quantity must be positive'),
  pricePerUnit: z.number().min(0, 'Price per unit must be positive'),
  totalCost: z.number().min(0, 'Total cost must be positive'),
  odometer: z.number().min(0, 'Odometer reading must be positive'),
  location: z.string().optional(),
  notes: z.string().max(500, 'Notes are too long').optional(),
});

export async function POST(request: Request) {
  try {
    console.log('POST /api/fleet-management/fuel-logs/create - Start');
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

    // Validate input
    const result = fuelLogSchema.safeParse(json);
    if (!result.success) {
      console.log('Validation error:', result.error);
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.format() },
        { status: 400 }
      );
    }

    // Verify vehicle ownership
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .select('id')
      .eq('id', result.data.vehicleId)
      .eq('user_id', user.id)
      .single();

    if (vehicleError || !vehicle) {
      console.log('Vehicle not found or unauthorized');
      return NextResponse.json(
        { error: 'Vehicle not found or unauthorized' },
        { status: 404 }
      );
    }

    // Convert camelCase to snake_case for database
    const fuelLogData = {
      vehicle_id: result.data.vehicleId,
      date: result.data.date,
      fuel_type_id: result.data.fuelTypeId,
      quantity: result.data.quantity,
      price_per_unit: result.data.pricePerUnit,
      total_cost: result.data.totalCost,
      odometer: result.data.odometer,
      location: result.data.location,
      notes: result.data.notes,
    };

    // Create the fuel log
    const { data, error } = await supabase
      .from('fuel_logs')
      .insert(fuelLogData)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Successfully created fuel log:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/fleet-management/fuel-logs/create:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 