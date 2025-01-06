import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const vehicleId = searchParams.get('vehicleId');

    if (!vehicleId) {
      return NextResponse.json(
        { error: 'Vehicle ID is required' },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });

    const { data: fuelLogs, error } = await supabase
      .from('fuel_logs')
      .select('*')
      .eq('vehicle_id', vehicleId)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching fuel logs:', error);
      return NextResponse.json(
        { error: 'Failed to fetch fuel logs' },
        { status: 500 }
      );
    }

    // Transform snake_case to camelCase
    const transformedLogs = fuelLogs.map(log => ({
      id: log.id,
      vehicleId: log.vehicle_id,
      date: log.date,
      fuelType: log.fuel_type,
      quantity: log.quantity,
      pricePerUnit: log.price_per_unit,
      totalCost: log.total_cost,
      odometer: log.odometer,
      gasStationId: log.gas_station_id,
      notes: log.notes,
      createdAt: log.created_at,
      updatedAt: log.updated_at,
      location: log.location
    }));

    console.log('Transformed fuel logs:', JSON.stringify(transformedLogs, null, 2));
    return NextResponse.json(transformedLogs);
  } catch (error) {
    console.error('Error in fuel logs list route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 