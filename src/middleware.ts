import { NextRequest, NextResponse } from 'next/server'

// Define protected routes (routes that require session)
const protectedRoutes = [
  '/stocks',
  '/dashboard',
  '/portfolio',
  '/trades',
  '/orders',
  '/profile',
  '/settings',
  // Add more protected routes as needed
]

// Define public routes (routes that don't require session)
const publicRoutes = [
  '/',
  '/login',
  '/signup',
  '/forgot-password',
  // Add more public routes as needed
]

async function checkSession(request: NextRequest): Promise<boolean> {
  try {
    // Simply check if auth token exists in cookies
    const authToken = request.cookies.get('auth-token')?.value;

    // Return true if token exists, false if not
    return !!authToken && authToken.length > 0;

  } catch (error) {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Files with extensions
  ) {
    return NextResponse.next();
  }

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Check if current route is public (exact match only, not startsWith)
  const isPublicRoute = publicRoutes.includes(pathname);

  // Check if session exists
  const hasSession = await checkSession(request);


  // If user has session
  if (hasSession) {
    // If user is on login page and has session, let client-side handle redirect
    // (Don't redirect in middleware since token might be set after page load)
    if (pathname === '/' || pathname === '/login') {
      return NextResponse.next();
    }
    // Allow access to all routes if session exists
    return NextResponse.next();
  }

  // If user doesn't have session
  if (!hasSession) {
    // If trying to access protected route without session, redirect to login
    if (isProtectedRoute) {
      // Store the attempted URL to redirect after login
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.set('redirect-after-login', pathname, {
        maxAge: 300, // 5 minutes
        httpOnly: false, // ❌ Changed: Make it readable by JavaScript
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
      return response;
    }

    // Allow access to public routes (including /)
    if (isPublicRoute || pathname === '/') {
      return NextResponse.next();
    }

    // For any other route, redirect to login with redirect URL stored
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.set('redirect-after-login', pathname, {
      maxAge: 300, // 5 minutes
      httpOnly: false, // ❌ Changed: Make it readable by JavaScript
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    return response;
  }

  return NextResponse.next();
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}