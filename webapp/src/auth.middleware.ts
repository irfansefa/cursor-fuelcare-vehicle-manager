import { NextResponse, type NextRequest } from 'next/server';
import { createMiddlewareClient } from '@/lib/supabase';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createMiddlewareClient(request, response);
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Handle reset password requests
  if (request.nextUrl.pathname === '/reset-password') {
    const token = request.nextUrl.searchParams.get('token');
    const type = request.nextUrl.searchParams.get('type');

    if (!token || type !== 'recovery') {
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    const { error: verifyError } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'recovery',
    });

    if (verifyError) {
      return NextResponse.redirect(new URL('/auth?error=Invalid or expired reset password link', request.url));
    }

    return NextResponse.redirect(new URL(`/auth/reset-password?token=${token}`, request.url));
  }

  if (!session && 
    !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 