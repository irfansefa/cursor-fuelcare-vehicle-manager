import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const supabase = createRouteHandlerClient({ cookies });

    // Convert camelCase to snake_case for database
    const updateData = {
      date: body.date,
      fuel_type: body.fuelType,
      quantity: body.quantity,
      price_per_unit: body.pricePerUnit,
      total_cost: body.totalCost,
      odometer: body.odometer,
      location: body.location,
      notes: body.notes,
    };

    const { data: fuelLog, error } = await supabase
      .from('fuel_logs')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating fuel log:', error);
      return NextResponse.json(
        { error: 'Failed to update fuel log' },
        { status: 500 }
      );
    }

    // Convert snake_case back to camelCase for response
    const response = {
      id: fuelLog.id,
      vehicleId: fuelLog.vehicle_id,
      date: fuelLog.date,
      fuelType: fuelLog.fuel_type,
      quantity: fuelLog.quantity,
      pricePerUnit: fuelLog.price_per_unit,
      totalCost: fuelLog.total_cost,
      odometer: fuelLog.odometer,
      location: fuelLog.location,
      notes: fuelLog.notes,
      createdAt: fuelLog.created_at,
      updatedAt: fuelLog.updated_at,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in update fuel log route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 