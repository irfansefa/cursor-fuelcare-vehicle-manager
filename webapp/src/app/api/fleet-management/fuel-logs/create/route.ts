import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const data = await request.json();

    if (!data.vehicleId) {
      return NextResponse.json(
        { error: 'Vehicle ID is required' },
        { status: 400 }
      );
    }

    const { data: fuelLog, error } = await supabase
      .from('fuel_logs')
      .insert([{
        vehicle_id: data.vehicleId,
        date: data.date,
        fuel_type: data.fuelType,
        quantity: data.quantity,
        price_per_unit: data.pricePerUnit,
        total_cost: data.totalCost,
        odometer: data.odometer,
        location: data.location,
        notes: data.notes,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating fuel log:', error);
      return NextResponse.json(
        { error: 'Failed to create fuel log' },
        { status: 500 }
      );
    }

    return NextResponse.json(fuelLog);
  } catch (error) {
    console.error('Error in create fuel log route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 