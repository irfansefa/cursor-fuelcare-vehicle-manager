import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase';

const expenseSchema = z.object({
  amount: z.number().min(0, 'Amount must be positive'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().max(200, 'Description is too long').optional(),
  category_id: z.string().min(1, 'Category is required'),
  vehicle_id: z.string().min(1, 'Vehicle is required'),
  vendor: z.string().max(100, 'Vendor name is too long').optional(),
});

export async function GET(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();

    // Get query parameters
    const url = new URL(request.url);
    const categoryId = url.searchParams.get('categoryId');
    const vehicleId = url.searchParams.get('vehicleId');
    const dateFrom = url.searchParams.get('dateFrom');
    const dateTo = url.searchParams.get('dateTo');
    const vendor = url.searchParams.get('vendor');
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
    const sortField = url.searchParams.get('sortField') || 'date';
    const sortOrder = url.searchParams.get('sortOrder') || 'desc';

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // First verify that the vehicle belongs to the user if vehicleId is provided
    if (vehicleId) {
      const { data: vehicle, error: vehicleError } = await supabase
        .from('vehicles')
        .select('id')
        .eq('id', vehicleId)
        .eq('user_id', user.id)
        .single();

      if (vehicleError || !vehicle) {
        return NextResponse.json(
          { error: 'Vehicle not found or unauthorized' },
          { status: 404 }
        );
      }
    }

    // Build query
    let query = supabase
      .from('expenses')
      .select(`
        *,
        categories (
          id,
          name,
          color
        ),
        vehicles (
          id,
          make,
          model,
          year,
          license_plate
        )
      `, { count: 'exact' });

    // Apply filters
    if (categoryId) query = query.eq('category_id', categoryId);
    if (vehicleId) query = query.eq('vehicle_id', vehicleId);
    if (dateFrom) query = query.gte('date', dateFrom);
    if (dateTo) query = query.lte('date', dateTo);
    if (vendor) query = query.ilike('vendor', `%${vendor}%`);

    // Add pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Add sorting
    query = query.order(sortField, { ascending: sortOrder === 'asc' });

    // Add pagination range
    query = query.range(from, to);

    const { data: expenses, error, count } = await query;

    console.log('Query parameters:', {
      vehicleId,
      categoryId,
      dateFrom,
      dateTo,
      vendor,
      page,
      pageSize,
      sortField,
      sortOrder
    });

    if (error) {
      console.error('Error fetching expenses:', error);
      return NextResponse.json(
        { error: 'Failed to fetch expenses' },
        { status: 500 }
      );
    }

    console.log('Raw expenses data:', JSON.stringify(expenses, null, 2));

    // Map the response to ensure category data is properly structured
    const mappedExpenses = expenses?.map(expense => ({
      ...expense,
      category: expense.categories,
      vehicles: undefined,
      categories: undefined
    }));

    console.log('Mapped expenses data:', JSON.stringify(mappedExpenses, null, 2));

    return NextResponse.json({
      data: mappedExpenses,
      meta: {
        currentPage: page,
        pageSize,
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
      }
    });
  } catch (error) {
    console.error('Unexpected error in GET /expenses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const json = await request.json();

    // Validate input
    const result = expenseSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.format() },
        { status: 400 }
      );
    }

    // Verify vehicle ownership
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .select('id')
      .eq('id', result.data.vehicle_id)
      .eq('user_id', user.id)
      .single();

    if (vehicleError || !vehicle) {
      return NextResponse.json(
        { error: 'Vehicle not found or unauthorized' },
        { status: 404 }
      );
    }

    // Create the expense
    const { data: expense, error } = await supabase
      .from('expenses')
      .insert([result.data])
      .select()
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
    console.error('Unexpected error in POST /expenses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 