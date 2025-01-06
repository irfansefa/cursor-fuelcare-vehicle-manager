import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const vehicleId = searchParams.get('vehicleId');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    if (!vehicleId) {
      return NextResponse.json(
        { error: 'Vehicle ID is required' },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });

    // Get total count
    const { count: totalCount, error: countError } = await supabase
      .from('fuel_logs')
      .select('*', { count: 'exact', head: true })
      .eq('vehicle_id', vehicleId);

    if (countError) {
      console.error('Error getting fuel logs count:', countError);
      return NextResponse.json(
        { error: 'Failed to get fuel logs count' },
        { status: 500 }
      );
    }

    // Calculate pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Get paginated data
    const { data: fuelLogs, error } = await supabase
      .from('fuel_logs')
      .select('*')
      .eq('vehicle_id', vehicleId)
      .order('date', { ascending: false })
      .range(from, to);

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

    return NextResponse.json({
      data: transformedLogs,
      meta: {
        currentPage: page,
        pageSize,
        totalCount: totalCount || 0,
        totalPages: Math.ceil((totalCount || 0) / pageSize),
      }
    });
  } catch (error) {
    console.error('Error in fuel logs list route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 