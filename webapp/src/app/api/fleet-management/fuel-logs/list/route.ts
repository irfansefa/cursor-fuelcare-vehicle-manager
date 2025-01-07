import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const vehicleId = searchParams.get('vehicleId');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const fuelTypeId = searchParams.get('fuelTypeId');
    const location = searchParams.get('location');
    const sortField = searchParams.get('sortField') || 'date';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    if (!vehicleId) {
      return NextResponse.json(
        { error: 'Vehicle ID is required' },
        { status: 400 }
      );
    }

    // Validate sort parameters
    const allowedSortFields = ['date', 'odometer', 'quantity', 'price_per_unit', 'total_cost', 'location'];
    const allowedSortOrders = ['asc', 'desc'];

    if (!allowedSortFields.includes(sortField) || !allowedSortOrders.includes(sortOrder)) {
      return NextResponse.json(
        { error: 'Invalid sort parameters' },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });

    // Build query with filters
    let query = supabase
      .from('fuel_logs')
      .select('*', { count: 'exact' })
      .eq('vehicle_id', vehicleId);

    if (dateFrom) {
      query = query.gte('date', dateFrom);
    }
    if (dateTo) {
      query = query.lte('date', dateTo);
    }
    if (fuelTypeId) {
      query = query.eq('fuel_type_id', fuelTypeId);
    }
    if (location) {
      query = query.ilike('location', `%${location}%`);
    }

    // Get total count with filters
    const { count: totalCount, error: countError } = await query;

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

    // Get paginated data with filters and sorting
    const { data: fuelLogs, error } = await query
      .order(sortField, { ascending: sortOrder === 'asc' })
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
      fuelTypeId: log.fuel_type_id,
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