import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/app/lib/supabase/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updateData = {
    date: body.date,
    fuel_type_id: body.fuelTypeId,
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

  const response = {
    id: fuelLog.id,
    vehicleId: fuelLog.vehicle_id,
    date: fuelLog.date,
    fuelTypeId: fuelLog.fuel_type_id,
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
}