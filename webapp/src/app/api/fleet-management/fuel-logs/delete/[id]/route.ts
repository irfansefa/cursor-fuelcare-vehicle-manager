import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/app/lib/supabase/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { error } = await supabase
    .from('fuel_logs')
    .delete()
    .eq('id', params.id);

  if (error) {
    console.error('Error deleting fuel log:', error);
    return NextResponse.json(
      { error: 'Failed to delete fuel log' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}