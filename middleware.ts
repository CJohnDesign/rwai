import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    // Match all paths except internals and static files
    '/((?!api|_next|_static|_vercel|images|.*\\.(?:jpg|jpeg|gif|png|svg|ico)).*)',
  ],
};

// Fast check for tracking parameters
function hasTrackingParams(urlString: string): boolean {
  return /_g[al]/.test(urlString);
}

// Helper to get the root domain from any hostname
function getRootDomain(hostname: string): string {
  // Remove port if present
  const host = hostname.split(':')[0];
  
  // If it's an IP address or localhost, return as is
  if (
    /^localhost$/.test(host) ||
    /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(host)
  ) {
    return host;
  }

  // Split hostname into parts
  const parts = host.split('.');
  // Get the last two parts for normal domains (e.g., rwai.xyz)
  // or the whole thing for special cases (e.g., vercel.app domains)
  return parts.slice(-2).join('.');
}

export default function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  
  // Get the current host without port
  const currentHost = hostname.split(':')[0];
  
  // Check if this is an app subdomain request
  const isAppSubdomain = currentHost.startsWith('app.');
  
  if (isAppSubdomain) {
    // Static assets and images pass-through
    if (
      url.pathname.startsWith('/_next/') ||
      url.pathname.startsWith('/favicon.ico') ||
      url.pathname.startsWith('/favicon_io/') ||
      url.pathname.startsWith('/images/') ||
      url.pathname.startsWith('/_next/image') || // Next.js image optimization
      /\.(jpg|jpeg|gif|png|svg|ico)$/i.test(url.pathname)
    ) {
      return NextResponse.next();
    }

    // For app subdomain, rewrite to app directory
    const newUrl = new URL(`/app${url.pathname}`, request.url);
    return NextResponse.rewrite(newUrl);
  }

  return NextResponse.next();
} 
