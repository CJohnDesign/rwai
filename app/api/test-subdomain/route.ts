import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || 'unknown';
  const referer = request.headers.get('referer') || 'unknown';
  const url = request.url || 'unknown';
  
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    host: host,
    referer: referer,
    url: url,
    isSubdomain: host.startsWith('app.'),
    isVercel: host.includes('vercel.app'),
    message: 'API is working correctly!'
  });
} 