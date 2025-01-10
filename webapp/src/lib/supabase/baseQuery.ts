import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createBrowserClient } from '@supabase/ssr';
import { PostgrestError } from '@supabase/supabase-js';

type FilterOperator = 
  | { eq: string | number | boolean }
  | { neq: string | number | boolean }
  | { gt: number }
  | { gte: number }
  | { lt: number }
  | { lte: number }
  | { like: string }
  | { ilike: string }
  | { in: Array<string | number> };

interface SupabaseQueryArgs {
  from: string;
  select?: string;
  filter?: Record<string, FilterOperator | string | number | boolean>;
  type?: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
  values?: Record<string, any>;
  single?: boolean;
  order?: Record<string, 'asc' | 'desc'>;
}

export const supabaseBaseQuery: BaseQueryFn<
  SupabaseQueryArgs,
  unknown,
  PostgrestError
> = async (queryArg) => {
  const { from, select = '*', filter, type = 'SELECT', values, single, order } = queryArg;

  try {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    let query = supabase.from(from);

    switch (type) {
      case 'INSERT':
        const { data: insertData, error: insertError } = await query.insert(values!).select();
        if (insertError) return { error: insertError };
        return { data: insertData[0] };

      case 'UPDATE':
        const { data: updateData, error: updateError } = await query
          .update(values!)
          .match(filter || {})
          .select();
        if (updateError) return { error: updateError };
        return { data: updateData[0] };

      case 'DELETE':
        const { error: deleteError } = await query.delete().match(filter || {});
        if (deleteError) return { error: deleteError };
        return { data: null };

      default:
        let selectQuery = query.select(select);

        if (filter) {
          Object.entries(filter).forEach(([key, value]) => {
            if (typeof value === 'object' && !Array.isArray(value)) {
              const [operator, operand] = Object.entries(value)[0];
              switch (operator) {
                case 'eq':
                  selectQuery = selectQuery.eq(key, operand);
                  break;
                case 'neq':
                  selectQuery = selectQuery.neq(key, operand);
                  break;
                case 'gt':
                  selectQuery = selectQuery.gt(key, operand);
                  break;
                case 'gte':
                  selectQuery = selectQuery.gte(key, operand);
                  break;
                case 'lt':
                  selectQuery = selectQuery.lt(key, operand);
                  break;
                case 'lte':
                  selectQuery = selectQuery.lte(key, operand);
                  break;
                case 'like':
                  selectQuery = selectQuery.like(key, operand as string);
                  break;
                case 'ilike':
                  selectQuery = selectQuery.ilike(key, operand as string);
                  break;
                case 'in':
                  selectQuery = selectQuery.in(key, operand as Array<string | number>);
                  break;
              }
            } else {
              selectQuery = selectQuery.eq(key, value);
            }
          });
        }

        if (order) {
          Object.entries(order).forEach(([key, direction]) => {
            selectQuery = selectQuery.order(key, { ascending: direction === 'asc' });
          });
        }

        const { data: selectData, error: selectError } = single
          ? await selectQuery.single()
          : await selectQuery;

        if (selectError) return { error: selectError };
        return { data: selectData };
    }
  } catch (error) {
    return { error: error as PostgrestError };
  }
}; 