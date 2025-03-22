import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    // Match all paths except internals and static files
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

// Fast check for tracking parameters
function hasTrackingParams(urlString: string): boolean {
  return /_g[al]/.test(urlString);
}

export default function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const pathname = url.pathname;
  const isVercel = hostname.includes('vercel.app');
  
  // IMPORTANT: Always log essential information
  console.log(`🔍 MIDDLEWARE - ${new Date().toISOString()}`);
  console.log(`📌 Host: ${hostname}`);
  console.log(`📌 Path: ${pathname}`);
  console.log(`📌 Vercel: ${isVercel ? 'Yes' : 'No'}`);

  // Check if the hostname is a subdomain
  const currentHost = hostname.split(':')[0];
  
  // Handle app subdomain
  if (currentHost.startsWith('app.')) {
    console.log(`🚀 App subdomain detected: ${hostname}`);

    // Static assets pass-through
    if (
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/favicon.ico') ||
      pathname.startsWith('/favicon_io/') ||
      pathname.startsWith('/images/')
    ) {
      console.log('⏩ Static asset - passing through');
      return NextResponse.next();
    }

    // If we have tracking parameters, handle them
    if (hasTrackingParams(request.url)) {
      // Fast parameter extraction using Set for O(1) lookup
      const TRACKING_PARAMS = new Set(['_gl', '_ga', '_ga_3RT06YPS1M']);
      const trackingParams: Record<string, string> = {};
      
      // Single iteration over search params
      for (const [key, value] of url.searchParams.entries()) {
        if (TRACKING_PARAMS.has(key)) {
          trackingParams[key] = value;
          url.searchParams.delete(key);
        }
      }

      // Create clean URL preserving the original pathname
      const cleanUrl = new URL(pathname + url.search, request.url);
      console.log(`➡️ Redirecting to clean URL: ${cleanUrl.toString()}`);
      const response = NextResponse.redirect(cleanUrl);

      // Batch cookie operations
      Object.entries(trackingParams).forEach(([param, value]) => {
        console.log(`🍪 Setting cookie: ${param}`);
        response.cookies.set(param, value, {
          domain: '.rwai.xyz',
          path: '/',
          secure: true,
          sameSite: 'none',
          maxAge: 2592000 // 30 days
        });
      });

      return response;
    }

    // For app subdomain without tracking params, rewrite to app directory
    const newUrl = new URL(`/app${pathname}`, request.url);
    console.log(`➡️ Rewriting app subdomain request to: ${newUrl.toString()}`);
    return NextResponse.rewrite(newUrl);
  }

  console.log('✅ Not a subdomain - proceeding normally');
  return NextResponse.next();
} 
