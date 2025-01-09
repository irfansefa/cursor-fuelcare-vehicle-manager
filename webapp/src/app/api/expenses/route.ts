import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const vehicles = searchParams.get('vehicles')?.split(',') || [];
  const dateFrom = searchParams.get('dateFrom');
  const dateTo = searchParams.get('dateTo');
  const categoryId = searchParams.get('categoryId');
  const vendor = searchParams.get('vendor');
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  const sortField = searchParams.get('sortField') || 'date';
  const sortOrder = searchParams.get('sortOrder') || 'desc';

  console.log('Fetching expenses with filters:', { vehicles, dateFrom, dateTo, categoryId, vendor, page, pageSize, sortField, sortOrder });

  const supabase = createRouteHandlerClient({ cookies });

  // Build query with filters
  let query = supabase
    .from('expenses')
    .select(`
      *,
      category:categories(*)
    `, { count: 'exact' });

  if (vehicles.length > 0) {
    query.in('vehicle_id', vehicles);
  }

  if (dateFrom) {
    query.gte('date', dateFrom);
  }

  if (dateTo) {
    query.lte('date', dateTo);
  }

  if (categoryId) {
    query.eq('category_id', categoryId);
  }

  if (vendor) {
    query.ilike('vendor', `%${vendor}%`);
  }

  // Get total count with filters
  const { count: totalCount, error: countError } = await query;

  if (countError) {
    console.error('Error getting expenses count:', countError);
    return NextResponse.json(
      { error: 'Failed to get expenses count' },
      { status: 500 }
    );
  }

  // Calculate pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Get paginated data with filters and sorting
  const { data, error } = await query
    .order(sortField, { ascending: sortOrder === 'asc' })
    .range(from, to);

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data,
    meta: {
      currentPage: page,
      pageSize,
      totalCount: totalCount || 0,
      totalPages: Math.ceil((totalCount || 0) / pageSize),
    }
  });
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const data = await request.json();

    if (!data.vehicle_id) {
      return NextResponse.json(
        { error: 'Vehicle ID is required' },
        { status: 400 }
      );
    }

    const { data: expense, error } = await supabase
      .from('expenses')
      .insert([{
        vehicle_id: data.vehicle_id,
        category_id: data.category_id,
        date: data.date,
        amount: data.amount,
        vendor: data.vendor,
        description: data.description,
      }])
      .select(`
        *,
        category:categories(*)
      `)
      .single();

    if (error) {
      console.error('Error creating expense:', error);
      return NextResponse.json(
        { error: 'Failed to create expense' },
        { status: 500 }
      );
    }

    return NextResponse.json(expense);
  } catch (error) {
    console.error('Error in create expense route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 